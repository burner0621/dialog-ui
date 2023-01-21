
import { inject, bindable} from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var innoLoader = require('../../../../loader/garment-intern-note-loader');
var invoiceLoader = require('../../../../loader/garment-invoice-note-loader');
var DOLoader = require('../../../../loader/garment-delivery-order-loader');
var NKLoader = require('../../../../loader/garment-correction-note-loader');
var suppLoader = require('../../../../loader/garment-supplier-loader');


@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    @bindable status
    statuses = ['','Sudah Bayar','Belum Bayar'];
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
    statusChanged(newvalue){
        if (newvalue) {
            if (newvalue === "Sudah Bayar") {
                this.statuspemb = "SB";
            }
            else if (newvalue === "Belum Bayar") { 
                this.statuspemb = "BB"; 
            } 
            else{
                this.statuspemb = "";
        }
        }
    }
    NPNView = (NPN) => {
      
        return `${NPN.npn}`
      }
    NPHView = (NPH) => {
      
        return `${NPH.nph}`
      }
    internView = (InternNo) => {
      
        return `${InternNo.inNo}`
      }
    invoiceView = (invoiceNo) => {
      
        return `${invoiceNo.invoiceNo}`
      }
    DoView = (DONo) => {
      
        return `${DONo.doNo}`
      }
    
    DoBPBsrView = (BillNo) => {
      
        return `${BillNo.billNo}`
      }
    DoBPKclView = (PaymentBill) => {
      
        return `${PaymentBill.paymentBill}`
      }

    NKView = (NK) => {
        return `${NK.CorrectionNo}`
    }
    
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            inno : this.InternNo ? this.InternNo.inNo : "",
            invono : this.invoiceNo ? this.invoiceNo.invoiceNo : "",
            dono : this.DONo ? this.DONo.doNo : "",
            billno : this.BillNo ? this.BillNo.billNo : "",
            paymentbill : this.PaymentBill ? this.PaymentBill.paymentBill : "",   
            npn : this.NPN ? this.NPN.npn: "",
            nph : this.NPH ? this.NPH.nph : "",
            corrno : this.NK ? this.NK.CorrectionNo : "",
            status : this.statuspemb,
            supplier : this.SupplierName ? this.SupplierName.Code : "",
            dateNIFrom : this.dateFromNI ? moment(this.dateFromNI).format("YYYY-MM-DD") : "",
            dateNITo : this.dateToNI ? moment(this.dateToNI).format("YYYY-MM-DD") : "",
            dueDateFrom : this.datefromDueDate ? moment(this.datefromDueDate).format("YYYY-MM-DD") : "",
            dueDateTo : this.dateToDueDate ? moment(this.dateToDueDate).format("YYYY-MM-DD") : "",
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                    var rowDoc=[];
                    console.log(result);
                    var datas=[];
                    var index=0;

                    for (var a of result.data ){

                        var doc=a.InvoiceNo;
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
                        _data.VatDate = moment(_data.VatDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.VatDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.VatDate).format("DD MMM YYYY");
                        _data.IncomeTaxDate = moment(_data.IncomeTaxDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.IncomeTaxDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.IncomeTaxDate).format("DD MMM YYYY");
                        _data.CorDate = moment(_data.CorDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.CorDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.CorDate).format("DD MMM YYYY");
                        _data.Tgl = moment(_data.Tgl).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.Tgl).format("DD MMM YYYY")=="01 Jan 1970"  ? "-" : moment(_data.Tgl).format("DD MMM YYYY");
                        _data.PriceTot = _data.PriceTot.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.Jumlah = _data.Jumlah.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        _data.NPN = _data.NPN == "" ? "-" : _data.NPN;
                        _data.NPH = _data.NPH == "" ? "-" : _data.NPH;
                        _data.CorrNo = _data.CorrNo == "" ? "-" : _data.CorrNo;
                        _data.CorrType = _data.CorrType == "" ? "-" : _data.CorrType;
                        _data.Nomor = _data.Nomor == "" ? "-" : _data.Nomor;

                        
                        let invoice=result.data.find(o=> o.InvoiceNo == _data.InvoiceNo);
                            // if(invoice){
                            //     invoice.rowspan=this.rowCount[_data.InvoiceNo];
                            // }

                           // let bcno=result.data.find(o=> o.BCType + o.BCNo==b.BCType + b.BCNo);
                            if(invoice){
                                 invoice.docspan=rowDoc[_data.InvoiceNo];
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
                    inno : this.InternNo ? this.InternNo.inNo : "",
                    invono : this.invoiceNo ? this.invoiceNo.invoiceNo : "",
                    dono : this.DONo ? this.DONo.doNo : "",
                    billno : this.BillNo ? this.BillNo.billNo : "",
                    paymentbill : this.PaymentBill ? this.PaymentBill.paymentBill : "",   
                    npn : this.NPN ? this.NPN.npn: "",
                    nph : this.NPH ? this.NPH.nph : "",
                    corrno : this.NK ? this.NK.CorrectionNo : "",
                    status : this.statuspemb,
                    supplier : this.SupplierName ? this.SupplierName.Code : "",
                    dateNIFrom : this.dateFromNI ? moment(this.dateFromNI).format("YYYY-MM-DD") : "",
                    dateNITo : this.dateToNI ? moment(this.dateToNI).format("YYYY-MM-DD") : "",
                    dueDateFrom : this.datefromDueDate ? moment(this.datefromDueDate).format("YYYY-MM-DD") : "",
                    dueDateTo : this.dateToDueDate ? moment(this.dateToDueDate).format("YYYY-MM-DD") : "",
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
