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

    processOptions=["PREPARING", "CUTTING IN", "CUTTING OUT", "LOADING", "SEWING IN", "SEWING OUT",
                    "FINISHING IN", "FINISHING OUT", "PENGELUARAN GUDANG JADI"];

    selectedProcessChanged(newValue){
        this.reset();
    }

    searching() {
        let filter={};
        var isPreparing= this.selectedProcess==="PREPARING";
        var isCutIn= this.selectedProcess==="CUTTING IN";
        var isCutOut= this.selectedProcess==="CUTTING OUT";
        var isLoading= this.selectedProcess==="LOADING";
        var isSewIn= this.selectedProcess==="SEWING IN";
        var isSewOut= this.selectedProcess==="SEWING OUT";
        var isFinIn= this.selectedProcess==="FINISHING IN";
        var isFinOut= this.selectedProcess==="FINISHING OUT";
        var isExGood= this.selectedProcess==="PENGELUARAN GUDANG JADI";
        if(this.unit){
            filter.UnitCode=this.unit.Code;
        }
        if(this.ro){
            filter.RONo=this.ro;
        }
        if(this.no){
            if(isPreparing)
                filter.UENNo=this.no;
            else if(isCutIn)
                filter.CutInNo=this.no;
            else if(isCutOut)
                filter.CutOutNo=this.no;
            else if(isLoading)
                filter.LoadingNo=this.no;
            else if(isSewIn)
                filter.SewingInNo=this.no;
            else if(isSewOut)
                filter.SewingOutNo=this.no;
            else if(isFinIn){
                filter.FinishingInNo=this.no;
            }
            else if(isFinOut)
                filter.FinishingOutNo=this.no;
            else if(isExGood)
                filter.ExpenditureGoodNo=this.no;
        }
        if(isFinIn){
            filter[`FinishingInType != "PEMBELIAN"`]=true;
        }
        
        let args = {
            page: this.info.page,
            size: this.info.size,
            filter: JSON.stringify(filter)
        };
        if(isPreparing){
            this.service.searchPreparing(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.UENNo;
                    s.date=s.ProcessDate;
                });
                this.fillTable();
            });
        }
        else if(isCutIn){
            this.service.searchCuttingIn(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.CutInNo;
                    s.date=s.CuttingInDate;
                    s.TotalQuantity=s.TotalCuttingInQuantity;
                });
                this.fillTable();
            });
        }
        else if(isCutOut){
            this.service.searchCuttingOut(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.CutOutNo;
                    s.date=s.CuttingOutDate;
                    s.TotalQuantity=s.TotalCuttingOutQuantity;
                });
                this.fillTable();
            });
        }
        else if(isLoading){
            this.service.searchLoading(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.LoadingNo;
                    s.date=s.LoadingDate;
                    s.TotalQuantity=s.TotalLoadingQuantity;
                });
                this.fillTable();
            });
        }
        else if(isSewIn){
            this.service.searchSewingIn(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.SewingInNo;
                    s.date=s.SewingInDate;
                    s.TotalQuantity=s.TotalQuantity;
                });
                this.fillTable();
            });
        }
        else if(isSewOut){
            this.service.searchSewingOut(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.SewingOutNo;
                    s.date=s.SewingOutDate;
                    s.TotalQuantity=s.TotalQuantity;
                });
                this.fillTable();
            });
        }
        else if(isFinIn){
            this.service.searchFinishingIn(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.FinishingInNo;
                    s.date=s.FinishingInDate;
                    s.TotalQuantity=s.TotalFinishingInQuantity;
                });
                this.fillTable();
            });
        }
        else if(isFinOut){
            this.service.searchFinishingOut(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.FinishingOutNo;
                    s.date=s.FinishingOutDate;
                    s.TotalQuantity=s.TotalQuantity;
                });
                this.fillTable();
            });
        }
        else if(isExGood){
            this.service.searchExpenditure(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                this.data.forEach(s => {
                    s.UnitCode=s.Unit.Code;
                    s.no=s.ExpenditureGoodNo;
                    s.date=s.ExpenditureDate;
                    s.TotalQuantity=s.TotalQuantity;
                });
                this.fillTable();
            });
        }
        
      }
    
      fillTable() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false, });
        columns.push({ field: 'no', title: 'No Dokumen' });
        columns.push({ field: 'RONo', title: 'No RO' });
        columns.push({ field: 'Article', title: 'Artikel' });
        columns.push({ field: 'UnitCode', title: 'Unit' });
        columns.push({ field: 'TotalQuantity', title: 'Jumlah' });
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
                dataIds.push(s.Id);
            }
        });
        if(dataIds.length==0){
            alert("Belum ada data yang dipilih");
        }
        else {
            var dataUpdate={};
            dataUpdate.ids=dataIds;
            dataUpdate.date=this.date ? this.date : null;
            this.service.updateDate(dataUpdate,this.selectedProcess )
            .then(result => {
                alert("Data berhasil diubah");
                this.searching();
            })
            .catch(e => {
                this.error = e.Date ? e.Date : e.date=="" ? "Tanggal harus diisi" : e;
            })
            
        }
    }
}