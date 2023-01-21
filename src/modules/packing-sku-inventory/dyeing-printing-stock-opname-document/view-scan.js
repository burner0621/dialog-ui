import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var GradeLoader = require('../../../loader/packing-sku-inventory-grade-loader');
var UomLoader = require('../../../loader/uom-loader');

@inject(Router, Service)
export class ViewScan {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
    }

    grades = ["","A", "B", "C","BS"];
    
    searching() {
        var info = {
            productionOrderId: this.selectedProductionOrder ? this.selectedProductionOrder.Id : null,
            barcode : this.barcode,
            documentNo : this.documentNo,
            grade : this.grade,
            userFilter : this.userFilter
        }
        this.service.searchViewScan(info)
            .then(result => {
                this.data=[];
                console.log(result);
                for(var _data of result){
                    // _data.price=_data.price.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    // _data.qtyOrder=_data.qtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    // _data.cuttingQtyMeter=_data.cuttingQtyMeter.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    // _data.stocks=_data.stock.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    // _data.cuttingsQtyPcs=_data.cuttingQtyPcs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    // _data.expenditures=_data.expenditure.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    // _data.remainQtys=_data.remainQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            productionOrderId: this.selectedProductionOrder ? this.selectedProductionOrder.Id : null,
            barcode : this.barcode,
            documentNo : this.documentNo,
            grade : this.grade,
            userFilter : this.userFilter
      
        }
        this.service.generateExcelMonitoring(info);
    }

    // get unitLoader(){
    //     return UnitLoader;
    // }
    // unitView = (unit) => {
    //     return `${unit.Code} - ${unit.Name}`;
    
    // }

    
    reset() {
        this.selectedProductionOrder = null;
        this.documentNo = null;
        this.grade = null;
        this.userFilter= null;
        this.barcode = null;
    }

    get sumPackagingQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.packagingQty;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }

    get sumBalance()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.balance;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    // get sumExpenditure()
    // {
    //     var sum=0;
    //     if(this.data)
    //     {
    //         for(var item of this.data)
    //         {
    //             sum += item.expenditure;
    //         }
    //     }
       
    //     return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    // }
    // get sumRemainQty()
    // {
    //     var sum=0;
    //     if(this.data)
    //     {
    //         for(var item of this.data)
    //         {
    //             sum += item.remainQty;
    //         }
    //     }
       
    //     return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    // }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }
    sPPFormatter = (spp) => {
        return `${spp.OrderNo}`
    }

    
}