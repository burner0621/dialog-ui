import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from "moment";
import numeral from "numeral";
const SupplierLoader = require('../../../../loader/supplier-loader');

@inject(Service)
export class List {
   controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    supplierTypeOptions = ["", "Lokal", "Import"];

    tableOptions = {
        showColumns: false,
        search: false,
        showToggle: false,
        sortable: false,
        pagination: false,
      };

    constructor(service) {
        this.service = service;
        this.info = {};
        this.error = {};
        this.data=[];
        this.isEmpty = true;
    }

    activate(){
      // console.log("Active");
      // var param = this.param;
      

    }
    reset() {
        this.error = {};
        this.info.SupplierType = null;
        this.info.Date = null;
        this.data = [];
        this.isEmpty = true;
    }
    searchDummy(){

      var supplierTypeNumeric = 0;
      switch(this.info.SupplierType){
        case "":
          supplierTypeNumeric =1;
          break;
        case "Lokal":
          supplierTypeNumeric=2;
          break;
        case "Import":
          supplierTypeNumeric=3;
          break;
        default:
          supplierTypeNumeric=0;
      }
      var param = {
        supplierType : supplierTypeNumeric,
        date : this.info.Date && this.info.Date != "Invalid Date" ? moment(this.info.Date).format('YYYY-MM-DD') : moment().format("YYYY-MM-DD")
      }
      console.log("Parameter",param);
      this.service.searchDummy(param).then(response=>{
        console.log("DummyData", response);
        console.log(JSON.stringify(response));
        var rowNumber = 0;        
        var data = response.data.map((item)=>{
          var countDispo = item.DispositionPayments.length;
          var countMemo = item.MemoDocuments.length;
          var minDispoSpan = 0;
          var maxDispoSpan = 0;
          var minMemoSpan =0;
          var maxMemoSpan =0;
          var result = [];

          var maxRow = countMemo > countDispo? countMemo : countDispo;
          for(var i =0;i<maxRow;i++){
            var dataItem={};
            if(i<countDispo){
              rowNumber++;
              dataItem.Index = rowNumber;
              dataItem.BankExpenditureDate = item.DispositionPayments[i].BankExpenditureDate;
              dataItem.BankExpenditureNo = item.DispositionPayments[i].BankExpenditureNo;
              dataItem.DispositionNo = item.DispositionPayments[i].DispositionNo;
              dataItem.SupplierName=item.DispositionPayments[i].SupplierName;
              dataItem.DownPaymentDuration = item.DispositionPayments[i].DownPaymentDuration;
              dataItem.InitialBalanceDispositionAmount= item.DispositionPayments[i].InitialBalanceDispositionAmount;
              dataItem.InitialBalancePaymentAmount = item.DispositionPayments[i].InitialBalancePaymentAmount;
              dataItem.InitialBalanceCurrencyRate = item.DispositionPayments[i].InitialBalanceCurrencyRate;
              dataItem.InitialBalanceCurrencyAmount = item.DispositionPayments[i].InitialBalanceCurrencyAmount;
              dataItem.DownPaymentDispositionAmount = item.DispositionPayments[i].DownPaymentDispositionAmount;
              dataItem.DownPaymentDispositionPaymentAmount = item.DispositionPayments[i].DownPaymentDispositionPaymentAmount;
              dataItem.DownPaymentCurrencyRate = item.DispositionPayments[i].DownPaymentCurrencyRate;
              dataItem.DownPaymentCurrencyAmount = item.DispositionPayments[i].DownPaymentCurrencyAmount;
              dataItem.LastBalanceCurrencyCode = item.DispositionPayments[i].LastBalanceCurrencyCode;
              dataItem.LastBalanceCurrencyRate = item.DispositionPayments[i].LastBalanceCurrencyRate;
              dataItem.LastBalanceCurrencyAmount = item.DispositionPayments[i].LastBalanceCurrencyAmount;
            }
            else{
              dataItem.Index = "";
              dataItem.BankExpenditureDate = "";
              dataItem.BankExpenditureNo = "";
              dataItem.DispositionNo = "";
              dataItem.SupplierName="";
              dataItem.DownPaymentDuration = "";
              dataItem.InitialBalanceDispositionAmount= "";
              dataItem.InitialBalancePaymentAmount = "";
              dataItem.InitialBalanceCurrencyRate = "";
              dataItem.InitialBalanceCurrencyAmount = "";
              dataItem.DownPaymentDispositionAmount = "";
              dataItem.DownPaymentDispositionPaymentAmount = "";
              dataItem.DownPaymentCurrencyRate = "";
              dataItem.DownPaymentCurrencyAmount = "";
              dataItem.LastBalanceCurrencyCode = "";
              dataItem.LastBalanceCurrencyRate = "";
              dataItem.LastBalanceCurrencyAmount = "";
            }

            if(i<countMemo){
              dataItem.MemoNo = item.MemoDocuments[i].MemoNo;
              dataItem.MemoDate = item.MemoDocuments[i].MemoDate;
              dataItem.RealizationDownPaymentCurrencyTotal = item.MemoDocuments[i].RealizationDownPaymentCurrencyTotal;
              dataItem.RealizationDownPaymentCurrencyRate = item.MemoDocuments[i].RealizationDownPaymentCurrencyRate;
              dataItem.RealizationDownPaymentCurrencyAmount = item.MemoDocuments[i].RealizationDownPaymentCurrencyAmount;
              dataItem.InternNoteDate = item.MemoDocuments[i].InternNoteDate;
              dataItem.InternNoteNo = item.MemoDocuments[i].InternNoteNo;
              dataItem.DeliveryOrderNo = item.MemoDocuments[i].DeliveryOrderNo;
              dataItem.PaymentNo = item.MemoDocuments[i].PaymentNo;
              dataItem.PaymentDescription = item.MemoDocuments[i].PaymentDescription;
              dataItem.PaymentCurrencyCode = item.MemoDocuments[i].PaymentCurrencyCode;
              dataItem.PaymentCurrencyRate = item.MemoDocuments[i].PaymentCurrencyRate;
              dataItem.PaymentCurrencyAmount = item.MemoDocuments[i].PaymentCurrencyAmount;
              dataItem.DifferenceCurrencyRate = item.MemoDocuments[i].DifferenceCurrencyRate;
            }else{
              dataItem.MemoNo = "";
              dataItem.MemoDate = "";
              dataItem.RealizationDownPaymentCurrencyTotal = "";
              dataItem.RealizationDownPaymentCurrencyRate = "";
              dataItem.RealizationDownPaymentCurrencyAmount = "";
              dataItem.InternNoteDate = "";
              dataItem.InternNoteNo = "";
              dataItem.DeliveryOrderNo = "";
              dataItem.PaymentNo = "";
              dataItem.PaymentDescription = "";
              dataItem.PaymentCurrencyCode = "";
              dataItem.PaymentCurrencyRate = "";
              dataItem.PaymentCurrencyAmount = "";
              dataItem.DifferenceCurrencyRate = "";
            }
            result.push(dataItem);
          }
          return result;
        });

        console.log("After Process",data);
        this.data = data;
        if(this.data.length > 0){
          this.isEmpty = false;
        }
        console.log("this.class", this);
        
      });
    }

    search(){

      var supplierTypeNumeric = 0;
      switch(this.info.SupplierType){
        case "":
          supplierTypeNumeric =1;
          break;
        case "Lokal":
          supplierTypeNumeric=2;
          break;
        case "Import":
          supplierTypeNumeric=3;
          break;
        default:
          supplierTypeNumeric=0;
      }
      var param = {
        supplierType : supplierTypeNumeric,
        date : this.info.Date && this.info.Date != "Invalid Date" ? moment(this.info.Date).format('YYYY-MM-DD') : moment().format("YYYY-MM-DD")
      }
      console.log("Parameter",param);
      this.service.search(param).then(response=>{
        console.log("DummyData", response);
        console.log(JSON.stringify(response));
        var rowNumber = 0;        
        var data = response.data.map((item)=>{
          var countDispo = item.DispositionPayments.length;
          var countMemo = item.MemoDocuments.length;
          var minDispoSpan = 0;
          var maxDispoSpan = 0;
          var minMemoSpan =0;
          var maxMemoSpan =0;
          var result = [];

          var maxRow = countMemo > countDispo? countMemo : countDispo;
          for(var i =0;i<maxRow;i++){
            var dataItem={};
            if(i<countDispo){
              rowNumber++;
              dataItem.Index = rowNumber;
              dataItem.BankExpenditureDate = item.DispositionPayments[i].BankExpenditureDate;
              dataItem.BankExpenditureNo = item.DispositionPayments[i].BankExpenditureNo;
              dataItem.DispositionNo = item.DispositionPayments[i].DispositionNo;
              dataItem.SupplierName=item.DispositionPayments[i].SupplierName;
              dataItem.DownPaymentDuration = item.DispositionPayments[i].DownPaymentDuration;
              dataItem.InitialBalanceDispositionAmount= item.DispositionPayments[i].InitialBalanceDispositionAmount;
              dataItem.InitialBalancePaymentAmount = item.DispositionPayments[i].InitialBalancePaymentAmount;
              dataItem.InitialBalanceCurrencyRate = item.DispositionPayments[i].InitialBalanceCurrencyRate;
              dataItem.InitialBalanceCurrencyAmount = item.DispositionPayments[i].InitialBalanceCurrencyAmount;
              dataItem.DownPaymentDispositionAmount = item.DispositionPayments[i].DownPaymentDispositionAmount;
              dataItem.DownPaymentDispositionPaymentAmount = item.DispositionPayments[i].DownPaymentDispositionPaymentAmount;
              dataItem.DownPaymentCurrencyRate = item.DispositionPayments[i].DownPaymentCurrencyRate;
              dataItem.DownPaymentCurrencyAmount = item.DispositionPayments[i].DownPaymentCurrencyAmount;
              dataItem.LastBalanceCurrencyCode = item.DispositionPayments[i].LastBalanceCurrencyCode;
              dataItem.LastBalanceCurrencyRate = item.DispositionPayments[i].LastBalanceCurrencyRate;
              dataItem.LastBalanceCurrencyAmount = item.DispositionPayments[i].LastBalanceCurrencyAmount;
              dataItem.DispositionPaymentDate = moment(item.DispositionPayments[i].DispositionPaymentDate).format("DD MMM YYYY");
              dataItem.DispositionPaymentId = item.DispositionPayments[i].DispositionPaymentId;
              dataItem.DispositionPaymentNo = item.DispositionPayments[i].DispositionPaymentNo;
              
            }
            else{
              dataItem.Index = "";
              dataItem.BankExpenditureDate = "";
              dataItem.BankExpenditureNo = "";
              dataItem.DispositionNo = "";
              dataItem.SupplierName="";
              dataItem.DownPaymentDuration = "";
              dataItem.InitialBalanceDispositionAmount= "";
              dataItem.InitialBalancePaymentAmount = "";
              dataItem.InitialBalanceCurrencyRate = "";
              dataItem.InitialBalanceCurrencyAmount = "";
              dataItem.DownPaymentDispositionAmount = "";
              dataItem.DownPaymentDispositionPaymentAmount = "";
              dataItem.DownPaymentCurrencyRate = "";
              dataItem.DownPaymentCurrencyAmount = "";
              dataItem.LastBalanceCurrencyCode = "";
              dataItem.LastBalanceCurrencyRate = "";
              dataItem.LastBalanceCurrencyAmount = "";
              dataItem.DispositionPaymentDate = "";
              dataItem.DispositionPaymentId = "";
              dataItem.DispositionPaymentNo = "";
            }

            if(i<countMemo){
              dataItem.MemoNo = item.MemoDocuments[i].MemoNo;
              dataItem.MemoDate = item.MemoDocuments[i].MemoDate;
              dataItem.RealizationDownPaymentCurrencyTotal = item.MemoDocuments[i].RealizationDownPaymentCurrencyTotal;
              dataItem.RealizationDownPaymentCurrencyRate = item.MemoDocuments[i].RealizationDownPaymentCurrencyRate;
              dataItem.RealizationDownPaymentCurrencyAmount = item.MemoDocuments[i].RealizationDownPaymentCurrencyAmount;
              dataItem.InternNoteDate = item.MemoDocuments[i].InternNoteDate;
              dataItem.InternNoteNo = item.MemoDocuments[i].InternNoteNo;
              dataItem.DeliveryOrderDate = item.MemoDocuments[i].DeliveryOrderDate;              
              dataItem.DeliveryOrderNo = item.MemoDocuments[i].DeliveryOrderNo;
              dataItem.PaymentNo = item.MemoDocuments[i].PaymentNo;
              dataItem.PaymentDescription = item.MemoDocuments[i].PaymentDescription;
              dataItem.PaymentCurrencyCode = item.MemoDocuments[i].PaymentCurrencyCode;
              dataItem.PaymentCurrencyRate = item.MemoDocuments[i].PaymentCurrencyRate;
              dataItem.PaymentCurrencyAmount = item.MemoDocuments[i].PaymentCurrencyAmount;
              dataItem.DifferenceCurrencyRate = item.MemoDocuments[i].DifferenceCurrencyRate;
            }else{
              dataItem.MemoNo = "";
              dataItem.MemoDate = "";
              dataItem.RealizationDownPaymentCurrencyTotal = "";
              dataItem.RealizationDownPaymentCurrencyRate = "";
              dataItem.RealizationDownPaymentCurrencyAmount = "";
              dataItem.InternNoteDate = "";
              dataItem.InternNoteNo = "";
              dataItem.DeliveryOrderDate = "";
              dataItem.DeliveryOrderNo = "";
              dataItem.PaymentNo = "";
              dataItem.PaymentDescription = "";
              dataItem.PaymentCurrencyCode = "";
              dataItem.PaymentCurrencyRate = "";
              dataItem.PaymentCurrencyAmount = "";
              dataItem.DifferenceCurrencyRate = "";
            }
            result.push(dataItem);
          }
          return result;
        });

        console.log("After Process",data);
        this.data = data;
        if(this.data.length > 0){
          this.isEmpty = false;
        }
        console.log("this.class", this);
        
      });
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    excel() {
      var supplierTypeNumeric = 0;
      switch(this.info.SupplierType){
        case "":
          supplierTypeNumeric =1;
          break;
        case "Lokal":
          supplierTypeNumeric=2;
          break;
        case "Import":
          supplierTypeNumeric=3;
          break;
        default:
          supplierTypeNumeric=0;
      }
      var param = {
        supplierType : supplierTypeNumeric,
        date : this.info.Date && this.info.Date != "Invalid Date" ? moment(this.info.Date).format('YYYY-MM-DD') : moment().format("YYYY-MM-DD")
      }
  
      this.service.getXls(param);
  
      // this.getExcelData();
    }
}