
import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

@inject(Service)
export class List {

  itemYears = [];
  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.flag = false;
    this.today = new Date();
    this.error = {};
    this.itemMonths = [
      { text: 'January', value: 1 },
      { text: 'February', value: 2 },
      { text: 'March', value: 3 },
      { text: 'April', value: 4 },
      { text: 'May', value: 5 },
      { text: 'June', value: 6 },
      { text: 'July', value: 7 },
      { text: 'August', value: 8 },
      { text: 'September', value: 9 },
      { text: 'October', value: 10 },
      { text: 'November', value: 11 },
      { text: 'Desember', value: 12 }
    ];

    this.currentYear = moment().format('YYYY');

    for (var i = parseInt(this.currentYear); i >= 2018; i--) {
      this.itemYears.push(i.toString());
    }
  }
  suppliertype = "";
  @bindable type
  @bindable KtgrItem;
         
  KategoriItem = ['','BAHAN BAKU', 'BAHAN PENDUKUNG', 'BAHAN EMBALASE'];
  SupplierType = ['','LOCAL', 'IMPORT'];
  bind(context) {
    console.log(context);
    this.context = context;

  }
  typeChanged(newvalue) {
    if (newvalue === "LOCAL") {
      this.suppliertype = false;
      //supp = {"Import" : this.suppliertype}

      //var supp = { "Import": i }
    } else if (newvalue === "IMPORT") {
      this.suppliertype = true;
      // this.suppQuery = {"Import" : this.suppliertype}
      // SupplierItem
      //var supp = { "Import": i }
    } else {
      this.suppliertype = "";
      // this.suppQuery = {"Import" : this.suppliertype}
    }
    //console.log(this.suppliertype);
  }

 KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP"; 
            } 
            else if (newvalue === "BAHAN EMBALASE") { 
                this.category = "BE"; 
            }           
            else {
                this.category = " "; 
            }
        }
        
    }

  activate() {
  }

  searching() {
    let args = {
      month: this.info.month.value,
      year: this.info.year,
      supplierType: this.suppliertype,
      category: this.category
    }
    this.service.search(args)
      .then(result => {
        this.rowCount = [];
        var SupplierCount = [];
        var SupplierDOCount =[];
        var TotalPerSupplier = {};
        var TotalIDRPerSupplier = {};
        var suppName = [];
        
        this.AmountTotalInitialBalance = 0;
        this.AmountTotalIDRInitialBalance = 0;
        this.AmountTotal = 0;
        this.AmountTotalIDR = 0;
        this.AmountTotalDebit = 0;
        this.AmountTotalDebitIDR = 0;
        this.AmountTotalKredit = 0;
        this.AmountTotalKreditIDR = 0;
        this.AmountTotalEndingBalance = 0;
        this.AmountTotalEndingBalanceIDR = 0;

        for(var _data of result){
          var coba = 0
          var MataUang = _data.DOCurrencyCode.toString();
          var Supplier = _data.SupplierName.toString();
          if(!SupplierDOCount[Supplier + MataUang]){
            SupplierDOCount[Supplier + MataUang] = 1
          }else{
            SupplierDOCount[Supplier + MataUang]++
          }
          if (!TotalPerSupplier[Supplier]) {
            TotalPerSupplier[Supplier] = 0;
          }
          if (!TotalIDRPerSupplier[Supplier]) {
            TotalIDRPerSupplier[Supplier] = 0;
          } 
          TotalPerSupplier[Supplier] = _data.TotalInitialBalance;
          TotalIDRPerSupplier[Supplier] = _data.TotalIDR;
          
          
          suppName.push(_data.SupplierName);
          this.AmountTotal += _data.InitialBalance;
          //this.AmountTotalIDR += _data.IDR;
          this.AmountTotalDebit += _data.TotalDebit;
          //this.AmountTotalDebitIDR += _data.TotalIDRDebit;
          this.AmountTotalKredit += _data.TotalKredit;
          //this.AmountTotalKreditIDR += _data.TotalIDRKredit;
          this.AmountTotalEndingBalance += _data.TotalEndingBalance;
          //this.AmountTotalEndingBalanceIDR += _data.TotalIDREndingBalance;

          _data.TotalInitialBalance = _data.TotalInitialBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          //_data.TotalIDR = _data.TotalIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          _data.InitialBalance = _data.InitialBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          //_data.IDR = _data.IDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          _data.TotalDebit = _data.TotalDebit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          //_data.TotalIDRDebit = _data.TotalIDRDebit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          _data.TotalKredit = _data.TotalKredit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          //_data.TotalIDRKredit = _data.TotalIDRKredit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          _data.TotalEndingBalance = _data.TotalEndingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          //_data.TotalIDREndingBalance = _data.TotalIDREndingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          _data.TglDebit = moment(_data.TglDebit).format("DD MMM YYYY") == "01 Jan 0001" || moment(_data.TglDebit).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(_data.TglDebit).format("DD MMM YYYY");

        }
        //console.log(TotalIDRPerSupplier);
        var suppdistinct = Array.from(new Set(suppName));
        for(var supp of suppdistinct){          
          this.AmountTotalInitialBalance += TotalPerSupplier[supp];
          //this.AmountTotalIDRInitialBalance += TotalIDRPerSupplier[supp];
        }
        
        this.AmountTotalInitialBalance = this.AmountTotalInitialBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        //this.AmountTotalIDRInitialBalance = this.AmountTotalIDRInitialBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.AmountTotal = this.AmountTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        //this.AmountTotalIDR = this.AmountTotalIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.AmountTotalDebit = this.AmountTotalDebit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        //this.AmountTotalDebitIDR = this.AmountTotalDebitIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.AmountTotalKredit = this.AmountTotalKredit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        //this.AmountTotalKreditIDR = this.AmountTotalKreditIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.AmountTotalEndingBalance = this.AmountTotalEndingBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        //this.AmountTotalEndingBalanceIDR = this.AmountTotalEndingBalanceIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        for (var b of result) {
          let SupplierDocspan = result.find(o => o.SupplierName + o.DOCurrencyCode == b.SupplierName + b.DOCurrencyCode);
          //console.log(SupplierDocspan);
          if (SupplierDocspan) {
            //console.log(rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.ProduksiQty.toString() + b.BJQty.toString() + b.Invoice.toString() + b.PEB.toString() + b.PEBDate.toString() + b.EksporQty.toString() + b.SampleQty.toString()]);
            //bcno.docspan = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.ProduksiQty.toString() + b.BJQty.toString() + b.Invoice.toString() + b.PEB.toString() + b.PEBDate.toString() + b.EksporQty.toString() + b.SampleQty.toString()];
            SupplierDocspan.docspan = SupplierDOCount[b.SupplierName + b.DOCurrencyCode]

          }
        }
        //console.log(SupplierDocspan);
        //this.info.total = result.info.total;
        this.data = result;
        console.log(this.data);
        //  console.log(result.info.total);
          //console.log(result);
      })
  }

  ExportToExcel() {
    this.error = {};
    if (Object.getOwnPropertyNames(this.error).length === 0) {
      let args = {
        month: this.info.month.value,
        year: this.info.year,
        supplierType: this.suppliertype,
        category: this.category
      };

      this.service.generateExcel(args)
        .catch(e => {
          alert(e.replace(e, "Error:", ""));
        });
    }
  }

 
  reset() {
    this.InternNo = null;
    this.invoiceNo = null;
    this.dono = null;
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
