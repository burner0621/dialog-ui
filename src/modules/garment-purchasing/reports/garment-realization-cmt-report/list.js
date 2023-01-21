import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var unitLoader = require('../../../../loader/unit-loader');
@inject(Router, Service)
export class List {
    info = { page: 1,size:75};
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    bind(context) {
        console.log(context);
        this.context = context;

    }

    search(){
            this.searching();        
    }
    activate() {
       
    }
    tableData = []
    searching() {
        var args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unit : this.unit ? this.unit.Code : "",
            page: this.info.page,
            size: this.info.size,
        };
        
        this.service.search(args)
            .then(result=>{
                var datas=[];
                console.log(result)
                for(var _data of result.data){
                    //console.log(_data)
                    datas.push(_data);
                 }
                 this.info.total= result.info.total;
                 this.data = result.data;
                //console.log(this.data)
                console.log(result.info.total)
                console.log(this.info)
               
                this.rowCount=[];
                var rowDoc=[];
                this.info.total=result.info.total;    
                var index=0;    
                for(var a of result.data){
                    //var bc=a.Invoice.toString();
                    //var doc=a.ExpanditurGoodId;
                    // var urt=a.count;
                    var inv=a.InvoiceNo.toString();
                    var bon=a.ExpenditureGoodNo.toString();
                    var ro=a.RONo.toString();
                    var article=a.Article.toString();
                    var QtyBj=a.UnitQty.toString();
                    var UENNo = a.UENNo.toString();
                    var PremarkUenno = a.ProductRemark.toString();
                    var qtybuk = a.Quantity.toString();
                    var UrnNo = a.URNNo.toString();
                    var PremarkUrnno = a.ProductRemark2.toString();
                    var qtyurn = a.ReceiptQuantity.toString();
                    var suppliername = a.SupplierName.toString();
                    var billNO = a.BillNo.toString();
                    var doNo = a.DONo.toString();
                    var paymentBill = a.PaymentBill.toString();
                    // if(!this.rowCount[inv + bon]){
                    //     this.rowCount[inv + bon]=1;
                    // }
                    // else{
                    //     this.rowCount[inv + bon]++;
                    // }

                    if(!rowDoc[inv + QtyBj]){
                        rowDoc[inv + QtyBj]=1;
                    }else{
                        rowDoc[inv + QtyBj]++;
                    }
 
                    if(!rowDoc[inv+ bon + ro + article + QtyBj]){
                        rowDoc[inv+ bon + ro + article + QtyBj]=1;
                    }
                    else{
                        rowDoc[inv+ bon + ro + article + QtyBj]++;
                    }

                    if(!rowDoc[inv + bon + UENNo]){
                        rowDoc[inv + bon + UENNo]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + PremarkUenno]){
                        rowDoc[inv + bon + UENNo + PremarkUenno]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + PremarkUenno]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + qtybuk + "qtybuk"]){
                        rowDoc[inv + bon + UENNo + qtybuk + "qtybuk"]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + qtybuk + "qtybuk"]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + UrnNo]){
                        rowDoc[inv + bon + UENNo + UrnNo]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + UrnNo]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + UrnNo + PremarkUrnno]){
                        rowDoc[inv + bon + UENNo + UrnNo + PremarkUrnno]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + UrnNo + PremarkUrnno]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + UrnNo + qtyurn + "qtyurn"]){
                        rowDoc[inv + bon + UENNo + UrnNo + qtyurn + "qtyurn"]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + UrnNo + qtyurn + "qtyurn"]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + UrnNo + suppliername]){
                        rowDoc[inv + bon + UENNo + UrnNo + suppliername]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + UrnNo + suppliername]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + ro]){
                        rowDoc[inv + bon + UENNo + ro]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + ro]++;
                    }

                    if(!rowDoc[inv + bon + UENNo + qtybuk + UrnNo + billNO + paymentBill + doNo]){
                        rowDoc[inv + bon + UENNo + qtybuk + UrnNo + billNO + paymentBill + doNo]=1;
                    }
                    else{
                        rowDoc[inv + bon + UENNo + qtybuk + UrnNo + billNO + paymentBill + doNo]++;
                    }

                }
                for(var b of result.data){
                    let nomor = result.data.find(o=> o.InvoiceNo + o.UnitQty == b.InvoiceNo + b.UnitQty);
                    if(nomor){
                        nomor.nospan = rowDoc[b.InvoiceNo.toString() + b.UnitQty.toString()];
                    }
                    let invoice=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.RONo + o.Article + o.UnitQty == b.InvoiceNo + b.ExpenditureGoodNo + b.RONo + b.Article + b.UnitQty);
                    if(invoice){
                        invoice.invoicespan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() +  b.RONo.toString() + b.Article.toString() + b.UnitQty.toString()];
                    }

                    let uen=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo);
                    if(uen){
                        uen.uenspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString()];
                    }

                    let remarkuen=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.ProductRemark == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.ProductRemark);
                    if(remarkuen){
                        remarkuen.remarkuenspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.ProductRemark.toString()];
                    }

                    let qtybuk=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.Quantity + "qtybuk" == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.Quantity + "qtybuk");
                    if(qtybuk){
                        qtybuk.qtybukspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.Quantity.toString() + "qtybuk"];
                    }

                    let urn=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.URNNo == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.URNNo);
                    if(urn){
                        urn.urnspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.URNNo.toString()];
                    }

                    let remarkurn=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.URNNo + o.ProductRemark2  == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.URNNo + b.ProductRemark2 );
                    if(remarkurn){
                        remarkurn.remarkurnspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.URNNo.toString() + b.ProductRemark2.toString() ];
                    }

                    let qtyurn=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.URNNo + o.ReceiptQuantity + "qtyurn" == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.URNNo + b.ReceiptQuantity + "qtyurn");
                    if(qtyurn){
                        qtyurn.qtyurnspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.URNNo.toString() + b.ReceiptQuantity.toString() + "qtyurn"];
                    }

                    let supplier=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.URNNo + o.SupplierName == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.URNNo + b.SupplierName);
                    if(supplier){
                        supplier.supplierspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.URNNo.toString() + b.SupplierName.toString()];
                    }

                    let bill=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.Quantity + o.URNNo + o.BillNo + o.PaymentBill + o.DONo == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.Quantity + b.URNNo + b.BillNo + b.PaymentBill + b.DONo);
                    if(bill){
                        bill.billspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.Quantity.toString() + b.URNNo.toString() + b.BillNo.toString() + b.PaymentBill.toString() + b.DONo.toString()];
                    }

                    let rouen=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo + o.UENNo + o.RONo == b.InvoiceNo + b.ExpenditureGoodNo + b.UENNo + b.RONo);
                    if(rouen){
                        rouen.rouenspan=rowDoc[b.InvoiceNo.toString() + b.ExpenditureGoodNo.toString() + b.UENNo.toString() + b.RONo.toString()];
                    }



                }

                for(var item of result.data){
                
                    item.UnitQty = item.UnitQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.EGAmountIDR = item.EGAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.Quantity = item.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.EAmountVLS = item.EAmountVLS.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.EAmountIDR = item.EAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.ReceiptQuantity = item.ReceiptQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.UAmountVLS = item.UAmountVLS.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.UAmountIDR = item.UAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     
                }


                this.data=result.data;
                console.log(this.data);

            
            });
            
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.data = [];
        
    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unit : this.unit ? this.unit.Code : "",
            //unitname: this.unit ? this.unit.Name : "",
       
        };
        
        this.service.generateExcel(args);
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
        return unitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code}- ${unit.Name}`;
    }

    get unitQuery(){
        var result = { "Description" : "GARMENT" }
        return result;   
      }
}
