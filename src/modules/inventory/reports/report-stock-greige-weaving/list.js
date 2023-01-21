
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
          
            
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                    var rowDoc=[];
                    console.log(result);
                    var datas=[];
                    var index=0;

                   


                    for (var _data of result.data){
                       // _data.Date = moment(_data.VatDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.VatDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.VatDate).format("DD MMM YYYY");
                       
                        _data.ReceiptRecheking = _data.ReceiptRecheking.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ReceiptFinishing = _data.ReceiptFinishing.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ReceiptProduction = _data.ReceiptProduction.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ReceiptPacking = _data.ReceiptPacking.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ReceiptPrinting = _data.ReceiptPrinting.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ReceiptOther = _data.ReceiptOther.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ExpendInspecting = _data.ExpendInspecting.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ExpendFinishing = _data.ExpendFinishing.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ExpendPacking = _data.ExpendPacking.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ExpendDirty = _data.ExpendDirty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ExpendOther = _data.ExpendOther.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.ExpendPrinting = _data.ExpendPrinting.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.BeginingBalance = _data.BeginingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.EndingBalance = _data.EndingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    }  
     
                
                     this.info.total= result.info.total;
                     this.data = result.data;  
                })
        }
    
    
        ExportToExcel() {
            this.error ={};
            if(Object.getOwnPropertyNames(this.error).length === 0){
                let args = {
                   
                    dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                };
                
                this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error:",""));
                });
            }
        }


    reset() {
       
        this.dateTo = null;

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}
