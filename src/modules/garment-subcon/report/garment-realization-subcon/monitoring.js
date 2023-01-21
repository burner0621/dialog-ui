import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const SubconContractLoader = require("../../../../loader/garment-subcon-contract-loader");

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    optionDate = "";
    dateFrom = null;
    dateTo = null;
    // @bindable JnsInv;
   
    // OptionDate = ['','TGL INVOICE', 'TGL TRUCKING', 'TGL PEB'];

    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    activate() {
       
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    // JnsInvChanged(newvalue) {
    //     if (newvalue) {
    //         if (newvalue === "TGL INVOICE") {
    //             this.optionDate = "TGL INVOICE";
    //         }
    //         else if (newvalue === "TGL TRUCKING") {
    //             this.optionDate = "TGL TRUCKING";
    //         }
    //         else {
    //             this.optionDate = "TGL PEB"; 
    //         }
    //     }
    // }

    searching() {
        {
        var info = {
            subconcontractNo : this.subconContract ? this.subconContract.ContractNo : "",          
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataIN = [];
                  var dataOut = [];
                  this.contractNo = this.subconContract.ContractNo;
                  this.bpjNo = this.subconContract.BPJNo;
                  this.dueDate = moment(this.subconContract.DueDate).format("DD MMM YYYY");
                  
                  this.totalItemIN = 0;
                  this.totalItemOUT = 0;
                  this.totalSubconItem = 0;
                  this.totalLeftoverItemOUT = 0;
                  this.totalLeftoverItemIN = 0;
                  for (var item of this.data.IN){
 
                        dataIN.push(item);
                        this.totalItemIN += item.quantityOut;
                  }
                  for (var item of this.data.Out){
 
                    dataOut.push(item);
                    this.totalItemOUT += item.quantityOut;
                    this.totalSubconItem = item.subconContractQuantity;
                    this.TotalLeftoverItemOUT = this.totalSubconItem - this.totalItemOUT;
                  }
                  this.IN = dataIN;
                  this.Out = dataOut;
                  this.totalLeftoverItemIN = this.totalItemOUT - this.totalItemIN;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                subconcontractNo : this.subconContract ? this.subconContract.ContractNo : "",               
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.buyerAgent = null;
        this.optionDate = null; 
        this.data = []; 
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 

    get subconContractLoader() {
        return SubconContractLoader;
    }
}