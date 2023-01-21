import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.BC = ['','BCDL', 'SELAIN BCDL'];
    }
   
    unitName=null;    
    supplierType = null;
    supplierName= " ";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable NamaSpl;
         
    SupplierType = ['','LOCAL', 'IMPORT'];
    SupplierName = ['','DAN LIRIS', 'SELAIN DAN LIRIS'];
      
    get unitLoader() {
        return UnitLoader;
    }

    activate() {
       
    }

    JenisSplChanged(newvalue) {
        if (newvalue) {
            this.supplierType = newvalue === "LOCAL" ? false : true;  
            console.log(this.supplierType);        
        }
    }

      searching() {
        {
            var info = {
            unitName : this.unitName ? this.unitName.Id : "",
            supplierType : this.JenisSpl ? this.supplierType : "",
            supplierName : this.NamaSpl,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            jnsbc : this.JenisBC ? this.JenisBC : ""
        }
        this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataBySupplier = {};
                  var subTotalSupplier1 = {};
                  var subTotalSupplier2 = {};
                  var subTotalSupplier3 = {};
                  var subTotalSupplier4 = {};
                  var subTotalSupplier5 = {}; 
                  var subTotalSupplier6 = {}; 
                  var subTotalSupplier7 = {}; 
                  var subTotalSupplier8 = {};                                   

                  for (var data of result) {
                       var Supplier = data.PaymentBill;
                       let Amount1 = 0,Amount2 = 0,Amount3 = 0,Amount4 = 0,Amount5 = 0,Amount6 = 0,Amount7 = 0,Amount8 = 0;
                       switch ( data.CodeRequirement) {
                       case 'BE' :
                            Amount1 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            Amount6 = 0;
                            Amount7 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount8 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                            
                            break;
                        case 'BP' :
                            Amount1 = 0;
                            Amount2 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            Amount6 = 0;
                            Amount7 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount8 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                            break;                            
                        case 'BB' :
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount4 = 0;
                            Amount5 = 0;
                            Amount6 = 0;
                            Amount7 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount8 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                            
                            break;
                        case 'PRC' :
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount5 = 0;
                            Amount6 = 0;
                            Amount7 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount8 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                            
                            break;    
                        case 'PPN' :
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            Amount6 = 0;
                            Amount7 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount8 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                          
                            break;                                                       
                        default:
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            Amount6 = 0;
                            Amount7 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount8 = data.Amount6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                            
                            break;     
                        }      
                     
                        if (!dataBySupplier[Supplier]) dataBySupplier[Supplier] = [];                 
                            dataBySupplier[Supplier].push({                            
                            SplName : data.SupplierName,
                            Konveksi : data.UnitName,
                            BCNomor : data.BCNo,
                            BCTipe : data.BCType,
                            BPBesar : data.BillNo,
                            BPKecil : data.PaymentBill,
                            NoSJ : data.DONo,
                            NotaInt : data.InternNo,
                            NmBrg : data.ProductName,
                            JnsBrg : data.CodeRequirement,
                            Jumlah : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                            
                            Satuan : data.UOMUnit,
                            MtUang : data.CurrencyCode,
                            Rate : data.Rate,   
                            AmountBE : Amount1,
                            AmountBP : Amount2,
                            AmountBB : Amount3,
                            AmountBX : Amount4,
                            AmountPPN : Amount5,
                            AmountPPH : Amount6, 
                            AmountDPPVLS : Amount7,
                            AmountDPPIDR : Amount8, 
                        });
                    
                        if (!subTotalSupplier1[Supplier]) {
                           subTotalSupplier1[Supplier] = 0;
                          } 

                        if (!subTotalSupplier2[Supplier]) {
                           subTotalSupplier2[Supplier] = 0;
                          } 
   
                        if (!subTotalSupplier3[Supplier]) {
                           subTotalSupplier3[Supplier] = 0;
                          } 

                        if (!subTotalSupplier4[Supplier]) {
                           subTotalSupplier4[Supplier] = 0;
                          } 

                        if (!subTotalSupplier5[Supplier]) {
                            subTotalSupplier5[Supplier] = 0;
                           } 

                        if (!subTotalSupplier6[Supplier]) {
                            subTotalSupplier6[Supplier] = 0;
                           } 

                        if (!subTotalSupplier7[Supplier]) {
                            subTotalSupplier7[Supplier] = 0;
                           } 
                           
                        if (!subTotalSupplier8[Supplier]) {
                            subTotalSupplier8[Supplier] = 0;
                           } 
                       
                       switch (data.CodeRequirement) {
                        case 'BE' :
                            subTotalSupplier1[Supplier] += data.Amount6;
                            subTotalSupplier7[Supplier] += data.Amount;
                            subTotalSupplier8[Supplier] += data.Amount6;
                            break;
                        case 'BP' :
                            subTotalSupplier2[Supplier] += data.Amount6;
                            subTotalSupplier7[Supplier] += data.Amount;
                            subTotalSupplier8[Supplier] += data.Amount6;
                            break;                            
                        case 'BB' :
                            subTotalSupplier3[Supplier] += data.Amount6;
                            subTotalSupplier7[Supplier] += data.Amount;
                            subTotalSupplier8[Supplier] += data.Amount6;
                            break;
                        case 'PRC' :
                            subTotalSupplier4[Supplier] += data.Amount6;
                            subTotalSupplier7[Supplier] += data.Amount;
                            subTotalSupplier8[Supplier] += data.Amount6;
                            break;
                        case 'PPN' :
                            subTotalSupplier5[Supplier] = 0;
                            subTotalSupplier7[Supplier] += data.Amount;
                            subTotalSupplier8[Supplier] += data.Amount6;
                            break;          
                        default:
                            subTotalSupplier6[Supplier] = 0;
                            subTotalSupplier7[Supplier] += data.Amount;
                            subTotalSupplier8[Supplier] += data.Amount6;
                            break;
                        }      

                        }
     
               var suppliers = [];
               this.AmountTotal1 = 0;
               this.AmountTotal2 = 0;
               this.AmountTotal3 = 0;
               this.AmountTotal4 = 0;
               this.AmountTotal5 = 0;
               this.AmountTotal6 = 0; 
               this.AmountTotal7 = 0;
               this.AmountTotal8 = 0; 
                                
                
               for (var data in dataBySupplier) {
                   suppliers.push({
                   data: dataBySupplier[data],
                   supplier: dataBySupplier[data][0].BPKecil,
                   mtuang: dataBySupplier[data][0].MtUang,                   
                   subTotal1: (subTotalSupplier1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalSupplier2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalSupplier3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal4: (subTotalSupplier4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),               
                   subTotal5: (subTotalSupplier5[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                   subTotal6: (subTotalSupplier6[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                   subTotal7: (subTotalSupplier7[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                   subTotal8: (subTotalSupplier8[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                     
             });
                   this.AmountTotal1 += subTotalSupplier1[data];
                   this.AmountTotal2 += subTotalSupplier2[data];
                   this.AmountTotal3 += subTotalSupplier3[data];
                   this.AmountTotal4 += subTotalSupplier4[data];
                   this.AmountTotal5 += subTotalSupplier5[data];  
                   this.AmountTotal6 += subTotalSupplier6[data];   
                   this.AmountTotal7 += subTotalSupplier7[data];  
                   this.AmountTotal8 += subTotalSupplier8[data];                                                                            
               }
               this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal3 = this.AmountTotal3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal4 = this.AmountTotal4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal5 = this.AmountTotal5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });            
               this.AmountTotal6 = this.AmountTotal6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                           
               this.AmountTotal7 = this.AmountTotal7.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                           
               this.AmountTotal8 = this.AmountTotal8.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                                          
               this.suppliers = suppliers;
             });
        }
    }

    ExportToExcel() {
        {
            var filter = {
            unitName : this.unitName ? this.unitName.Id : "",
            supplierType : this.JenisSpl ? this.supplierType : "",
            supplierName : this.NamaSpl,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            jnsbc : this.JenisBC ? this.JenisBC : ""
           }

        this.service.generateExcel(filter)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unitName = null;
        this.supplierType = false; 
        this.supplierName = null;         
        this.suppliers = [];
        this.AmountTotal1 = null;
        this.AmountTotal2 = null;
        this.AmountTotal3 = null;
        this.AmountTotal4 = null;
        this.AmountTotal5 = null;     
        this.AmountTotal6 = null;     
        this.AmountTotal7 = null;     
        this.AmountTotal8 = null;                   
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}