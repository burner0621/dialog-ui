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
      this.service.searchDummy(param).then(response=>{
        console.log("DummyData", response);
        var data = response.data.map((item)=>{
          var countDispo = item.DispositionExpenditures.length;
          var countMemo = item.MemoDocuments.length;
          var minDispoSpan = 0;
          var maxDispoSpan = 0;
          var minMemoSpan =0;
          var maxMemoSpan =0;

          var maxRow = countMemo > countDispo? countMemo : countDispo;
          if(countMemo > countDispo){
            maxRow = countMemo;
            maxDispoSpan = Math.ceil(countMemo / countDispo);
            minDispoSpan = countMemo % countDispo;
            minDispoSpan = minDispoSpan == 0?maxDispoSpan: minDispoSpan;
            minMemoSpan = 1;
            maxMemoSpan = 1;
          }else{
            maxRow = countDispo;
            maxDispoSpan = 1;
            minDispoSpan = 1;
            maxMemoSpan= Math.ceil(countDispo/countMemo);
            minMemoSpan = countDispo % countMemo;
            minMemoSpan = minMemoSpan == 0 ? maxMemoSpan : minMemoSpan;
          }
          
          var itemDispositionExpenditures = item.DispositionExpenditures.map((dispo,index)=>{
            if(countDispo === index + 1){
              dispo._rowspan = countDispo==1? maxDispoSpan: minDispoSpan;
              // dispo._rowspan = maxRow - ((index+1)*maxDispoSpan);              
            }else{
              dispo._rowspan = maxDispoSpan;
            }
            return dispo;
          });

          var itemMemos = item.MemoDocuments.map((memo,index1)=>{
            if(countMemo === index1 + 1){
              memo._rowspan = countMemo == 1? maxMemoSpan: minMemoSpan;
              // memo._rowspan = maxRow - ((index1+1)*maxMemoSpan);              
            }else{
              memo._rowspan = maxMemoSpan;
            }
            return memo;
          });

          item.DispositionExpenditures = itemDispositionExpenditures;
          item.MemoDocuments = itemMemos;
          item._maxRow = maxRow;

          return item;
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
}