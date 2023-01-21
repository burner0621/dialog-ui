
import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Dialog } from './../../../au-components/dialog/dialog';
import moment from 'moment';
import { sample } from 'underscore';

// var bcnoLoader = require('../../../loader/traceable-in-bc-loader');
var bcnoLoader = require('../../../loader/garment-beacukai-loader');
// var roloader = require('../../../loader/traceable-in-ro-loader');
var roloader = require('../../../loader/garment-unit-delivery-order-loader');
var itemloader = require('../../../loader/traceable-in-item-loader');

@inject(Service,Dialog)
export class List {
    info = { page: 1,size:25};
    constructor(service,dialog) {
        this.service = service;
        this.dialog = dialog;
        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    @bindable type
    @bindable typeBC
    Types = ["No BC Masuk"];
    TypeBC = ["","BC 2.6.2","BC 2.3","BC 4.0","BC 2.7"];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
    
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
    get filterQuery(){
        if(this.type === "No BC Masuk"){
            var jenis = {"CustomsType": this.typebc }
        }else if(this.type === "RO Job"){
            var jenis = {"filter":"ROJob"}
        }
        //     var jenis = {"filter":"ComodityName"} 
        // }

        return jenis;
    }
    // search(){
    //     this.info.page = 1;
    //     this.info.total = 0;
    //     this.searching();
    // }
    typeChanged(newvalue) {
        if (newvalue) {
            // if (newvalue === "RO Job") {
            //     this.tipe = "ROJob";
            //     this.BCNo = null;
            //     this.itemcode = null;
            //     this.comodity = null;
            // }
            if (newvalue === "No BC Masuk") { 
                this.tipe = "BCNo"; 
                //this.BCNo = null;
                this.rojob = null;
                this.itemcode = null;
                this.comodity = null;
            }
        //     else if (newvalue === "Kode Barang") {
        //         this.tipe = "ItemCode"; 
        //         this.BCNo = null;
        //         this.rojob = null;
        //         //this.itemcode = null;
        //         this.comodity = null;
        //     } 
        //     else{
        //         this.tipe = "BCDate";
        //         this.BCNo = null;
        //         this.rojob = null;
        //         this.itemcode = null;
        //         this.comodity = null;
        // }
        }
    }
    typeBCChanged(newvalue){
        if(newvalue){
            if (newvalue === "BC 2.6.2") {
                this.typebc = "BC 262";
            }
            else if (newvalue === "BC 2.3") { 
                this.typebc = "BC 23";
            }
            else if (newvalue === "BC 4.0") { 
                this.typebc = "BC 40";
            }
            else if (newvalue === "BC 2.7") { 
                this.typebc = "BC 27";
            }
        }
    }
    
    searching() {
        if(!this.BCNo){
            console.log(this.BCNo)
            alert("No BC Masuk harus Diisi");
        }else{
        let args = {
            
            // page: this.info.page,
            // size: this.info.size,
            bcno : this.BCNo,
            type : this.tipe ? this.tipe : "",
            tipebc : this.typebc ? this.typebc : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                    var rowDoc=[]
                    //console.log(result);
                    
                    var index=0;  
                    for(var _data of result.data){
                        var bc = _data.BCType.toString();
                        var doc = _data.BCNo.toString();
                        var date = _data.BCDate.toString();
                        var bon = _data.BonNo.toString();
                        // var po = _data.PO.toString();
                        // var buk = _data.BUK.toString();
                        var QtyBuk = _data.QtyBUK.toString();
                        var ic = _data.ItemCode.toString();
                        var iname = _data.ItemName.toString();
                        var receipt = _data.ReceiptQty.toString();
                        // var satreceipt = _data.SatuanReceipt.toString();
                        var satbuk = _data.SatuanBUK.toString();
                        // var ro = _data.ROJob.toString();
                        // var proQty = _data.ProduksiQty.toString();
                        var BjQty = _data.BJQty.toString();
                        // var invo = _data.Invoice.toString();
                        var peb = _data.PEB.toString();
                        // var pebDate = _data.PEBDate.toString();
                        var EksporQty = _data.EksporQty.toString();
                        var SampleQty = _data.SampleQty.toString();
                        var Sisa = _data.Sisa.toString();
                        // var bum = _data.BUM.toString();
                        var SampleQtyOut = _data.SampleQtyOut.toString();
                        var wip = _data.WIP.toString();
                        

                        if (!rowDoc[bc + doc + date]) {
 
                            rowDoc[bc + doc + date] = 1
                        }
                        else {
                            rowDoc[bc + doc + date]++
                        }
                        if(!rowDoc[bon]){
                            rowDoc[bon] = 1
                        }else{
                            rowDoc[bon]++
                        }
                        // if(!rowDoc[ro + po]){
                        //     rowDoc[ro + po] = 1
                        // }else{
                        //     rowDoc[ro + po]++
                        // }
                        // if(!rowDoc[po]){
                        //     rowDoc[po] = 1
                        // }else{
                        //     rowDoc[po]++
                        // }
                        if(!rowDoc[ic + bon]){
                            rowDoc[ic + bon] = 1
                        }else{
                            rowDoc[ic + bon]++
                        }
                        if(!rowDoc[iname + bon]){
                            rowDoc[iname + bon] = 1
                        }else{
                            rowDoc[iname + bon]++
                        }
                        if(!rowDoc[receipt + "bum" + ic]){
                            rowDoc[receipt + "bum" + ic] = 1
                        }else{
                            rowDoc[receipt + "bum" + ic]++
                        }
                        // if(!rowDoc[satreceipt + "uomreceipt"]){
                        //     rowDoc[satreceipt + "uomreceipt"] = 1
                        // }else{
                        //     rowDoc[satreceipt + "uomreceipt"]++
                        // }
                        // if(!rowDoc[buk + QtyBuk + po]){
                        //     rowDoc[buk + QtyBuk + po] = 1
                        // }else{
                        //     rowDoc[buk + QtyBuk + po]++
                        // }
                        if(!rowDoc[QtyBuk + ic]){
                            rowDoc[QtyBuk + ic] = 1
                        }else{
                            rowDoc[QtyBuk + ic]++
                        }
                        if(!rowDoc[SampleQtyOut+ "qtysample" + ic]){
                            rowDoc[SampleQtyOut+ "qtysample" + ic] = 1
                        }else{
                            rowDoc[SampleQtyOut+ "qtysample" + ic]++
                        }
                        if(!rowDoc[Sisa + "sisa" + ic ]){
                            rowDoc[Sisa + "sisa" + ic ] = 1
                        }else{
                            rowDoc[Sisa + "sisa" + ic ]++
                        }
                        if(!rowDoc[satbuk + "uombuk" ]){
                            rowDoc[satbuk + "uombuk"  ] = 1
                        }else{
                            rowDoc[satbuk + "uombuk"  ]++
                        }
                        if(!rowDoc[wip + ic]){
                            rowDoc[wip + ic] = 1
                        }else{
                            rowDoc[wip + ic]++
                        }
                        if(!rowDoc[BjQty + ic]){
                            rowDoc[BjQty + ic] = 1
                        }else{
                            rowDoc[BjQty + ic]++
                        }
                        // if(!rowDoc[invo + ro]){
                        //     rowDoc[invo + ro] = 1
                        // }else{
                        //     rowDoc[invo + ro]++
                        // }
                        if(!rowDoc[peb + ic + bon]){
                            rowDoc[peb + ic + bon] = 1
                        }else{
                            rowDoc[peb + ic + bon]++
                        }
                        // if(!rowDoc[pebDate + ro + invo]){
                        //     rowDoc[pebDate + ro + invo] = 1
                        // }else{
                        //     rowDoc[pebDate + ro + invo]++
                        // }
                        if(!rowDoc[EksporQty + ic + BjQty]){
                            rowDoc[EksporQty + ic + BjQty] = 1
                        }else{
                            rowDoc[EksporQty + ic + BjQty]++
                        }
                        if(!rowDoc[SampleQty + ic]){
                            rowDoc[SampleQty + ic] = 1
                        }else{
                            rowDoc[SampleQty + ic]++
                        }
                        // if (!rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt]) {
                        //     rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt] = 1;
                        // }
                        // else{
                        //   rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt]++;
                        // }
                        // if (!rowDoc[bc + doc + date + bon]){
                        //     rowDoc[bc + doc + date + bon] = 1
                        // }
                        // else{
                        //     rowDoc[bc + doc + date + bon]++
                        // }

                        
                        // if (!rowDoc[doc + bc + bon + po + ic + iname ]) {
                        //     rowDoc[doc + bc + bon + po + ic + iname ] = 1
                        // }else{
                        //     rowDoc[doc + bc + bon + po + ic + iname ]++
                        // }
                        // if (!rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt + ROJob + buk ]) {
                        //     rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt + ROJob + buk ] = 1
                        // } else {
                        //     rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt + ROJob + buk ]++
                        // }
                        // if (!rowDoc[doc + bc + bon + ROJob + po]) {
                        //     rowDoc[doc + bc + bon +  ROJob + po] = 1
                        // } else {
                        //     rowDoc[doc + bc + bon + ROJob + po]++
                        // }
                        // if (!rowDoc[doc + bc + bon + po  +  QtyBuk]){
                        //     rowDoc[doc + bc + bon + po  + QtyBuk] = 1
                        // }else{
                        //     rowDoc[doc + bc + bon + po  + QtyBuk]++
                        // }
                        // if (!rowDoc[doc + bc + bon + po +  Sisa]){
                        //     rowDoc[doc + bc + bon + po +  Sisa] = 1
                        // }else{
                        //     rowDoc[doc + bc + bon + po +  Sisa]++
                        // }
                        // if (!rowDoc[doc + bc + bon  + ROJob + po + buk + proQty]){
                        //     rowDoc[doc + bc + bon  + ROJob + po + buk + proQty] = 1
                        // }else{
                        //     rowDoc[doc + bc + bon  + ROJob + po + buk + proQty]++
                        // }
                        // if (!rowDoc[doc + bc + bon + ROJob + invo + peb + EksporQty]){
                        //     rowDoc[doc + bc + bon + ROJob + invo + peb + EksporQty] = 1
                        // }else{
                        //     rowDoc[doc + bc + bon + ROJob + invo + peb + EksporQty]++
                        // }
                        // if (!rowDoc[doc + bc + bon + po  + satbuk]){
                        //     rowDoc[doc + bc + bon + po  + satbuk] = 1
                        // }else{
                        //     rowDoc[doc + bc + bon + po  + satbuk]++
                        // }

                   
                    }
                    for(var b of result.data){
                        let bonno = result.data.find(o=>o.BonNo == b.BonNo);
                        if(bonno) {
                            bonno.bonspan = rowDoc[b.BonNo.toString()]
                        }
                        // let rojob = result.data.find(o=>o.ROJob + o.PO == b.ROJob + b.PO);
                        // if(rojob){
                        //     rojob.rojobspan = rowDoc[b.ROJob.toString() + b.PO.toString()];
                        // }
                        // let po = result.data.find(o=>o.PO == b.PO);
                        // if(po){
                        //     po.pospan = rowDoc[b.PO.toString()];
                        // }
                        let itemcode = result.data.find(o=>o.ItemCode + o.BonNo == b.ItemCode + b.BonNo);
                        if(itemcode){
                            itemcode.itemcodespan = rowDoc[b.ItemCode.toString() + b.BonNo.toString()]
                        }
                        let itemname = result.data.find(o=>o.ItemName + o.BonNo == b.ItemName + b.BonNo);
                        if(itemname){
                            itemname.itemnamespan =  rowDoc[b.ItemName.toString() + b.BonNo.toString()]
                        }
                        let qtyreceipt = result.data.find(o=>o.ReceiptQty + "bum" + o.ItemCode == b.ReceiptQty + "bum" + b.ItemCode);
                        if(qtyreceipt){
                            qtyreceipt.qtyreceiptspan = rowDoc[b.ReceiptQty.toString() + "bum" + b.ItemCode.toString()]
                        }
                        // let satuanreceipt = result.data.find(o=>o.SatuanReceipt + "uomreceipt" == b.SatuanReceipt + "uomreceipt");
                        // if(satuanreceipt){
                        //     satuanreceipt.satuanreceiptspan = rowDoc[b.SatuanReceipt.toString() + "uomreceipt"]
                        // }
                        // let nobuk = result.data.find(o=>o.BUK + o.QtyBUK + o.PO == b.BUK + b.QtyBUK + b.PO);
                        // if(nobuk){
                        //     nobuk.nobukspan = rowDoc[b.BUK.toString() + b.QtyBUK.toString() + b.PO.toString()]
                        // }
                        let qtybuk = result.data.find(o => o.QtyBUK + o.ItemCode == b.QtyBUK + b.ItemCode)
                        if(qtybuk){
                            qtybuk.qtybukspan = rowDoc[b.QtyBUK.toString() + b.ItemCode.toString()]
                        }

                        let qtysamout = result.data.find(o => o.SampleQtyOut + "qtysample" + o.ItemCode == b.SampleQtyOut + "qtysample" + b.ItemCode)
                        if(qtysamout){
                            qtysamout.qtysamoutspan = rowDoc[b.SampleQtyOut.toString() + "qtysample" + b.ItemCode.toString()]
                        }

                        let sisa = result.data.find(o => o.Sisa + "sisa" + o.ItemCode == b.Sisa + "sisa" + b.ItemCode)
                        if(sisa){
                            sisa.sisaspan = rowDoc[b.Sisa.toString() + "sisa" + b.ItemCode.toString()]
                        }

                        let satuanbuk = result.data.find(o => o.SatuanBUK  + "uombuk" == b.SatuanBUK  + "uombuk" )
                        if(satuanbuk){
                            satuanbuk.satuanbukspan = rowDoc[b.SatuanBUK.toString()  + "uombuk" ]
                        }

                        let wip = result.data.find(o => o.WIP + o.ItemCode == b.WIP + b.ItemCode)
                        if(wip){
                            wip.wipsan = rowDoc[b.WIP.toString() + b.ItemCode.toString()]
                        }
                        // let produksiQty = result.data.find(o => o.ProduksiQty + o.ROJob == b.ProduksiQty + b.ROJob)
                        // if(produksiQty){
                        //     produksiQty.produksiQtyspan = rowDoc[b.ProduksiQty.toString() + b.ROJob.toString()]
                        // }

                        let bjquantity = result.data.find(o => o.BJQty + o.ItemCode == b.BJQty + b.ItemCode)
                        if(bjquantity){
                            bjquantity.bjquantityspan = rowDoc[b.BJQty.toString() + b.ItemCode.toString()]
                        }

                        // let invoice = result.data.find(o => o.Invoice + o.ROJob == b.Invoice + b.ROJob)
                        // if(invoice){
                        //     invoice.invoicespan = rowDoc[b.Invoice.toString() + b.ROJob.toString()]
                        // }

                        let pebno = result.data.find(o => o.PEB + o.ItemCode + o.BonNo == b.PEB + b.ItemCode + b.BonNo)
                        if(pebno){
                            pebno.pebnospan = rowDoc[b.PEB.toString() + b.ItemCode.toString() + b.BonNo.toString()]
                        }

                        // let pebdate = result.data.find(o=>o.PEBDate + o.ROJob + o.Invoice == b.PEBDate + b.ROJob + b.Invoice)
                        // if(pebdate){
                        //     pebdate.pebdatespan = rowDoc[b.PEBDate.toString() + b.ROJob.toString() + b.Invoice.toString()]
                        // }

                        let eksporqty = result.data.find(o=>o.EksporQty + o.ItemCode + o.BJQty== b.EksporQty + b.ItemCode + b.BJQty)
                        if(eksporqty){
                            eksporqty.eksporqtyspan = rowDoc[b.EksporQty.toString() + b.ItemCode.toString() + b.BJQty.toString()]
                        }

                        let samppleqty = result.data.find(o=>o.SampleQty + o.ItemCode == b.SampleQty + b.ItemCode)
                        if(samppleqty){
                            samppleqty.samppleqtyspan = rowDoc[b.SampleQty.toString() + b.ItemCode.toString()]
                        }
                        // let bcno = result.data.find(o => o.BCType + o.BCNo + o.BonNo + o.PO + o.ItemCode + o.ItemName == b.BCType + b.BCNo + b.BonNo + b.PO + b.ItemCode + b.ItemName)
                        // if(bcno){
                        //     bcno.docspan = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString()]       
                        // }
                        // let bctipe = result.data.find(o => o.BCNo + o.BCType + o.BonNo + o.PO + o.ItemCode + o.ItemName + o.ReceiptQty + o.SatuanReceipt == b.BCNo + b.BCType + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt);
                        // if(bctipe){
                        //     bctipe.rowspan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt];
                        // }
                        let bcno2 = result.data.find(o => o.BCType + o.BCNo + o.BCDate == b.BCType + b.BCNo + b.BCDate);
                        if (bcno2) {
                            bcno2.bcnospan = rowDoc[b.BCType + b.BCNo + b.BCDate];
                        }
                        // let ro = result.data.find(o => o.BCType + o.BCNo + o.BCDate + o.BonNo == b.BCType + b.BCNo + b.BCDate + b.BonNo)
                        // if(ro){
                        //     ro.rospan = rowDoc[b.BCType + b.BCNo + b.BCDate + b.BonNo];
                        // }
                        // let bcdoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo + o.PO  +o.QtyBUK== b.BCNo + b.BCType + b.BonNo + b.PO  + b.QtyBUK)
                        // if (bcdoc) {
                        //     bcdoc.qtybukspan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.PO  + b.QtyBUK];
                        // }
                        // let sisadoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo + o.PO  + o.Sisa== b.BCNo + b.BCType + b.BonNo + b.PO  + b.Sisa)
                        // if (sisadoc) {
                        //     sisadoc.sisaspan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.PO  + b.Sisa];
                        // }
                        // let satbukdoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo + o.PO  + o.SatuanBUK== b.BCNo + b.BCType + b.BonNo + b.PO  + b.SatuanBUK)
                        // if (satbukdoc) {
                        //     satbukdoc.satbukspan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.PO  + b.SatuanBUK];
                        // }
                        // let prodoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo + o.ROJob + o.PO + o.BUK + o.ProduksiQty == b.BCNo + b.BCType + b.BonNo+ b.ROJob + b.PO + b.BUK + b.ProduksiQty)
                        // if (prodoc) {
                        //     prodoc.prospan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.ROJob + b.PO + b.BUK + b.ProduksiQty];
                        // }
                        // let ekspordoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo + o.ROJob + o.Invoice + o.PEB + o.PEBDate + o.EksporQty== b.BCNo + b.BCType + b.BonNo + b.ROJob + b.Invoice + b.PEB + b.PEBDate + b.EksporQty)
                        // if (ekspordoc) {
                        //     ekspordoc.eksporspan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.ROJob + b.Invoice + b.PEB + b.EksporQty];
                        // }
                        // let po = result.data.find(o => o.BCType + o.BCNo + o.BonNo + o.PO + o.ItemCode + o.ItemName + o.ReceiptQty + o.SatuanReceipt + o.ROJob + o.BUK == b.BCType + b.BCNo + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt + b.ROJob + b.BUK)
                        // if(po){
                        //     po.docspanpo = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.BUK.toString()]
                        // }
                        // let rojob = result.data.find(o => o.BCType + o.BCNo + o.BonNo +  o.ROJob + o.PO == b.BCType + b.BCNo + b.BonNo +  b.ROJob + b.PO)
                        // if(rojob){
                        //     rojob.rojobspan = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString()  + b.ROJob.toString() + b.PO.toString()]
                        // }

                    }

                    for(var t of result.data){
                        // t.PEBDate = moment(t.PEBDate).format("DD MMM YYYY") == "01 Jan 1970" || moment(t.PEBDate).format("DD MMM YYYY") == "01 Jan 1900" ? "-" : moment(t.PEBDate).format("DD MMM YYYY");
                        // t.ROJob = t.ROJob == "rojob-" ? "-" : t.ROJob;
                        // t.BUK = t.BUK == "buk-" ? "-" : t.BUK;
                        t.SatuanBUK = t.SatuanBUK == "satbuk-" ? "-" : t.SatuanBUK;
                        // t.Invoice = t.Invoice == "invo-" ? "-" : t.Invoice;
                        t.PEB = t.PEB == "peb-" ? "-" : t.PEB;
                        t.QtyBUK = t.QtyBUK == "QtyBUK0" ? 0 : t.QtyBUK;
                        t.Sisa = t.Sisa == "Sisa0" ? 0 : t.Sisa;
                        // t.ProduksiQty = t.ProduksiQty == "ProduksiQty0" ? 0 : t.ProduksiQty;
                        t.BJQty = t.BJQty == "BJQty0" ? 0 : t.BJQty;
                        t.EksporQty = t.EksporQty == "EksporQty0" ? 0 : t.EksporQty;
                        t.SampleQty = t.SampleQty == "SampleQty0" ? 0 : t.SampleQty;

                    }

                     this.data = result.data;
                     
                     console.log(this.data);

                 
                 
                })
            }
        }
    
    
        ExportToExcel() {
            this.error ={};
            if(Object.getOwnPropertyNames(this.error).length === 0){
                if(!this.BCNo){
                    // console.log(this.BCNo)
                    alert("No Dokumen harus Diisi");
                }else{
                let args = {
                    bcno : this.BCNo,
                    type : this.tipe ? this.tipe : "",
                    tipebc : this.typebc ? this.typebc : "",
                    dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                    dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                };
            
                this.service.generateExcel(args)
                .catch((result) => {
                    alert("Data Tidak Ditemukan.");
                } )
            }
            }
        }

    get bcnoLoader(){
        return bcnoLoader;
    }

    get rojobLoader(){
        return roloader;
    }

    get itemcodeLoader(){
        return itemloader;
    }


    reset() {
        this.BCNo = null;
        this.rojob = null;
        this.itemcode = null;
        this.comodity = null;
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    garmentbeacukaiView = (gbcno) => {
		return`${gbcno.beacukaiNo}`
	  }

      garmnetrojobview = (grojob) => {
		return`${grojob.RONo}`
	  }
}



