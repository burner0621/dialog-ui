import {bindable,inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    @bindable selectedProcess;

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    info = { page: 1,size:25};

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    search(){
        this.info.page = 1;
        this.info.total=0;
        this.searching();
    
    }

    bind(context) {
        this.context = context;
    }

    processOptions=["BUM", "BUK"];

    selectedProcessChanged(newValue){
        this.reset();
    }

    searching() {
        let filter={};
        var isBUM= this.selectedProcess==="BUM";
        var isBUK= this.selectedProcess==="BUK";

        if(this.no){
            if(isBUM)
                filter.URNNo=this.no;
            else if(isBUK)
                filter.UENNo=this.no;
            
        }
        
        let args = {
            page: this.info.page,
            size: this.info.size,
            filter: JSON.stringify(filter)
        };

        if(isBUM){
            this.service.searchBUM(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    
                    s.SupplierName=s.Supplier.Name;
                    
                });
                this.fillTableURN();
            });
        }
        else if(isBUK){
            this.service.searchBUK(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.no=s.UENNo;
                    s.UnitDOno = s.UnitDONo;
                    s.expenditureType = s.ExpenditureType;
                    s.expenditureTo = s.ExpenditureTo;
                    s.date=s.CreatedUtc;
                });
                this.fillTableUEN();
            });
        }
        
      }
    
    fillTableURN() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false, });
        columns.push({ field: 'URNNo', title: 'No Dokumen' });
        columns.push({ field: 'URNType', title: 'Tipe Bon Terima Unit' });
        columns.push({ field: 'SupplierName', title: 'Supplier' });
        columns.push({ field: 'DONo', title: 'No. Surat Jalan' });
        columns.push({ field: 'DRNo', title: 'No. Bukti Pengantar' });
        columns.push({ field: 'UENNo', title: 'No. Bon Pengeluaran' });
        columns.push({ field: 'CreatedUtc', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });

        var bootstrapTableOptions = {
          columns: columns,
          data: this.data,
          fixedColumns: true,
          fixedNumber: 1
        };
        //bootstrapTableOptions.height = 150;

        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        
    }

    fillTableUEN() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false, });
        columns.push({ field: 'UENNo', title: 'No. Bon Pengeluaran Unit' });
        columns.push({ field: 'UnitDOno', title: 'No. Delivery Order' });
        columns.push({ field: 'expenditureType', title: 'Jenis Pengeluaran' });
        columns.push({ field: 'expenditureTo', title: 'Tujuan Barang' });
        columns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });

        var bootstrapTableOptions = {
          columns: columns,
          data: this.data,
          fixedColumns: true,
          fixedNumber: 1
        };
        //bootstrapTableOptions.height = 150;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        
    }


    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    reset() {
        this.data = null;
        this.no = null;
        this.unit = null;
        this.ro=null;
        this.info.page = 1;
        this.info.total=0;
        $(this.table).bootstrapTable('destroy');
    }

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    get totalQuantity(){
        var qty=0;
        if(this.data){
            for(var item of this.data){
                if(item.isEdit){
                    qty+=item.TotalQuantity;
                }
            }
        }
        return qty;
    }

    changeDate(newValue){
        var dataIds=[];
        this.data.forEach(s=>{
            if(s.isEdit){
                dataIds.push(s);
            }
        });
        if(dataIds.length==0){
            alert("Belum ada data yang dipilih");
        }
        else {
            var dataUpdate={};
            dataUpdate.Ids = dataIds;
            dataUpdate.reviseDate = this.date ? moment(this.date).format("YYYY-MM-DD") : null;
            this.service.updateDate(dataUpdate,this.selectedProcess )
            .then(result => {
                // this.service.addhistories(dataUpdate,this.selectedProcess )
                alert("Data berhasil diubah");
                    this.searching();
                // .then(result => {
                    
                // })
                
            })
            .catch(e => {
                this.error = e.Date ? e.Date : e.reviseDate=="" ? "Tanggal harus diisi" : e;
            })
            
        }
    }
}