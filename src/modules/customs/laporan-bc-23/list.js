
import { inject, bindable} from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';


@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    bind(context) {
        console.log(context);
        this.context = context;

    }

    attached() {
    }

    activate() {
    }

    
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                    var rowDoc=[]
                    console.log(result);
                    var datas=[];
                    var index=0;
                    for (var _data of result.data){
                        _data.BCDate = moment(_data.BCDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.BCDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.BCDate).format("DD MMM YYYY");

                    }  
                
                     this.info.total= result.info.total;
                     this.data = result.data;

                 
                 
                })
        }
    
    
        ExportToExcel() {
            this.error ={};
            if(Object.getOwnPropertyNames(this.error).length === 0){
                let args = {
                    dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                    dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                };
                
                this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error:",""));
                });
            }
        }

    get innoLoader(){
        return innoLoader;
    }

    get invoiceLoader(){
        return invoiceLoader;
    }

    get DOLoader(){
        return DOLoader;
    }

    get DOBBLoader(){
        return DOLoader;
    }

    get DOBKLoader(){
        return DOLoader;
    }

    get NKLoader(){
        return NKLoader;
    }
    get NPNLoader(){
        return invoiceLoader;
    }
    get NPHLoader(){
        return invoiceLoader;
    }
    get SupplierLoader(){
        return suppLoader;
    }
    reset() {
        this.InternNo = null;
        this.invoiceNo = null;
        this.dono = null;
        this.billno = null;
        this.paymentbill = null;
        this.npn = null;
        this.nph = null;
        this.corrno = null;
        this.supplier = null;
        this.dateFromNI = null;
        this.dateToNI = null,
        this.datefromDueDate = null,
        this.dateToDueDate = null,
        this.status = ""
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}
