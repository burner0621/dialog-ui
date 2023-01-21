
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
    
    bonTypes = ["","PACKING", "FINISHING", "PRINTING", "LAIN-LAIN","KOTOR","INSPECTING WEAVING"];
    bind(context) {
        console.log(context);
        this.context = context;

    }

    attached() {
    }

    activate() {
    }

    // filterQuery={
    //     "filter":"BCNo"
    // }
    // search(){
    //     this.info.page = 1;
    //     this.info.total = 0;
    //     this.searching();
    // }
    // statusChanged(newvalue){
    //     if (newvalue) {
    //         if (newvalue === "Sudah Bayar") {
    //             this.statuspemb = "SB";
    //         }
    //         else if (newvalue === "Belum Bayar") { 
    //             this.statuspemb = "BB"; 
    //         } 
    //         else{
    //             this.statuspemb = "";
    //     }
    //     }
    // }
    // NPNView = (NPN) => {
      
    //     return `${NPN.npn}`
    //   }
    // NPHView = (NPH) => {
      
    //     return `${NPH.nph}`
    //   }
    // internView = (InternNo) => {
      
    //     return `${InternNo.inNo}`
    //   }
    // invoiceView = (invoiceNo) => {
      
    //     return `${invoiceNo.invoiceNo}`
    //   }
    // DoView = (DONo) => {
      
    //     return `${DONo.doNo}`
    //   }
    
    // DoBPBsrView = (BillNo) => {
      
    //     return `${BillNo.billNo}`
    //   }
    // DoBPKclView = (PaymentBill) => {
      
    //     return `${PaymentBill.paymentBill}`
    //   }

    // NKView = (NK) => {
    //     return `${NK.CorrectionNo}`
    // }
    
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
          
            destination : this.destination,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                    var rowDoc=[];
                    console.log(result);
                    var datas=[];
                    var index=0;

                    for (var a of result.data ){

                        var doc=a.BonNo;
                       // var  = a.Jumlah;

                        // if(!this.rowCount[doc]){
                        //     this.rowCount[doc]=1;
                        // }
                        // else{
                        //     this.rowCount[doc]++;
                        // }


                        if(!rowDoc[doc]){
                            index++;
                            //a.count=index;
                            rowDoc[doc]=1;
                        }

                        else{
                            rowDoc[doc]++;
                        }
                    }


                    for (var _data of result.data){
                        _data.Date = moment(_data.VatDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.VatDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.VatDate).format("DD MMM YYYY");
                       
                        _data.Quantity = _data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.QuantityPiece = _data.QuantityPiece.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.QuantityTot = _data.QuantityTot.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.QuantityPieceTot = _data.QuantityPieceTot.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.Number = _data.Number.toLocaleString('en-EN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                       // _data.NPN = _data.NPN == "" ? "-" : _data.NPN;
                       

                        
                        let bonNo=result.data.find(o=> o.BonNo == _data.BonNo);
                            // if(invoice){
                            //     invoice.rowspan=this.rowCount[_data.InvoiceNo];
                            // }

                           // let bcno=result.data.find(o=> o.BCType + o.BCNo==b.BCType + b.BCNo);
                            if(bonNo){
                                 bonNo.docspan=rowDoc[_data.BonNo];
                            }

                    }  
                    // for(var _data of result.data){
                    //     var bc = _data.BCType.toString();
                    //     var doc = _data.BCNo.toString();
                    //     var bon = _data.BonNo.toString();
                    //     var po = _data.PO.toString();
                    //     var ic = _data.ItemCode.toString();
                    //     var iname = _data.ItemName.toString();
                    //     _data.PEBDate = _data.PEBDate == ""?'-': moment(_data.PEBDate).format("D MMM YYYY")
                    //     if(!this.rowCount[bc]){
                    //         this.rowCount[bc]=1;
                    //     }
                    //     else{
                    //         this.rowCount[bc]++;
                    //     }
     
                    //     if(!rowDoc[doc+bc+bon]){
                    //         //index++;
                    //         //_data.count=index;
                    //         rowDoc[doc+bc+bon]=1;
                    //     }
                    //     else{
                    //         rowDoc[doc+bc+bon]++;
                    //     }
                    //     _data.Sisa = _data.QtyReceipt - _data.QtyExpend
                    //_data.priceTotal=_data.priceTotal.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    //console.log(this.rowCount);
                    //console.log(rowDoc);
                    //console.log(_data);
                    // datas.push(_data);
                    // }
                    // for(var b of result.data){
                    //     let bcno=result.data.find(o=> o.BCType + o.BCNo + o.BonNo ==b.BCType + b.BCNo +b.BonNo);
                    //     if(bcno){
                    //         bcno.docspan=rowDoc[b.BCNo+b.BCType+b.BonNo];
                    //     }
                    //     let bctipe=result.data.find(o=> o.BCType ==b.BCType);
                    //     if(bctipe){
                    //         bctipe.rowspan=this.rowCount[b.BCType];
                    //     }
                        
                    // }
                
                     this.info.total= result.info.total;
                     this.data = result.data;
                    //  console.log(result.info.total);
                    //  console.log(this.data);

                 
                 
                })
        }
    
    
        ExportToExcel() {
            this.error ={};
            if(Object.getOwnPropertyNames(this.error).length === 0){
                let args = {
                    destination : this.destination,
                    dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                    dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                };
                
                this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error:",""));
                });
            }
        }


    reset() {
        this.destination= null;
        this.dateFrom = null;
        this.dateTo = null;

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}
