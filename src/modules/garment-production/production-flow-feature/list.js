import {bindable,inject} from 'aurelia-framework';
import {Service, SalesService} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

const PreparingLoader = require('../../../loader/garment-preparing-ro-loader');

@inject(Router, Service, SalesService)
export class List {
    // @bindable roNo;

    constructor(router, service, salesService) {
        this.service = service;
        this.router = router;
        this.salesService=salesService;
    }

    bind(context) {
        this.context = context;
    }

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({})
            };
            return this.service.searchPreparing(info)
                .then((result) => {
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= roList.find(d=>d.RONo==a.RONo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                        }
                        return roList;
                    
                });
        }
    }

    // async roNoChanged(newValue){
    //     if(newValue){
    //         this.RONo=newValue;
    //         this.article="";
    //         this.comodity="";
    //         this.buyer = "";
    //         this.quantity = "";

    //         // let preparingresult = await this.service.searchPreparing({ size: 1, filter: JSON.stringify({ RONo: this.RONo}) });
    //         // let dataprepare = preparingresult.data[0];
    //         // this.article=dataprepare.Article;

    //         let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.RONo }) });
    //         if(noResult.data.length >0){
    //             let dataComo=noResult.data[0];
    //             this.comodity = dataComo.Comodity.Name;
    //             this.buyer=dataComo.Buyer.Name;
    //             this.quantity=dataComo.Quantity;
    //         } else {
    //             const comodityCodeResult = await this.salesService.getHOrderKodeByNo({ no: this.RONo });
    //             const comodityCode = comodityCodeResult.data[0];
    //             if (comodityCode) {
    //                 const comodityResult = await this.coreService.getGComodity({ size: 1, filter: JSON.stringify({ Code: comodityCode }) });
    //                 this.comodity = comodityResult.data[0];
    //             }
    //         }
    //     }
    // }

    async getcomodity(newValue){
         this.RONo=newValue;
         let noResult =  await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.RONo }) });
            if(noResult.data.length >0){
                let dataComo=noResult.data[0];
                this.comodity = dataComo.Comodity.Name;
                this.buyer=dataComo.Buyer.Name;
                this.quantity=dataComo.Quantity;
            } else {
                const comodityCodeResult =  await this.salesService.getHOrderKodeByNo({ no: this.RONo });
                const comodityCode = comodityCodeResult.data[0];
                if (comodityCode) {
                    const comodityResult =  await this.coreService.getGComodity({ size: 1, filter: JSON.stringify({ Code: comodityCode }) });
                    this.comodity = comodityResult.data[0];
                }
            }
    }

    searching() {
        // 
        // console.log(this.roNo);
        this.RONo=this.roNo;
        if (!this.RONo) {
          alert("No RO Harus Diisi");
        }
        else {

            this.service.searchPreparing({ filter: JSON.stringify({ RONo: this.RONo}) })
            .then(result => {
              this.data = [];
              this.products=[];
              this.totalQuantity=0;
              this.article = result.data[0].Article;
                for(var prepare of result.data){
                    // this.Article = prepare.Article;
                    let dataItem=[];
                    dataItem["UENNo"]=prepare.UENNo;
                    dataItem["date"]=prepare.ProcessDate;
                    dataItem["qty"]=0;
                    for(var item of prepare.Items){
                        dataItem["qty"]+=item.Quantity;
                        if(this.products.length==0){
                            this.products.push(item.Product.Code);
                        }
                        else{
                            var dup= this.products.find(a=>a==item.Product.Code);
                            if(!dup){
                                this.products.push(item.Product.Code);
                            }
                        }
                        dataItem[item.Product.Code]= dataItem[item.Product.Code] ? dataItem[item.Product.Code]+item.Quantity :item.Quantity;
                        this.totalQuantity+=item.Quantity;
                    }
                    this.data.push(dataItem);
                }

                this.service.searchCutting({ filter: JSON.stringify({ RONo: this.RONo}) })
                .then(result => {
                    this.cuttingData=[];
                    this.cuttingSizes=[];
                    this.totalCutQuantity=0;
                    for(var cutting of result.data){
                        for(var item of cutting.Items){
                            for(var detail of item.Details){
                                let dataItem=[];
                                if (this.cuttingData.length==0){
                                    dataItem["color"]=detail.Color;
                                    dataItem["CuttingNo"]=cutting.CutOutNo;
                                    dataItem["date"]=cutting.CuttingOutDate;
                                    dataItem["qty"]=detail.CuttingOutQuantity;
                                    dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.CuttingOutQuantity :detail.CuttingOutQuantity;
                                    this.cuttingData.push(dataItem);
                                }
                                else{
                                    var same= this.cuttingData.find(s=>s.color==detail.Color && s.CuttingNo==cutting.CutOutNo);
                                    if(!same){
                                        dataItem["color"]=detail.Color;
                                        dataItem["CuttingNo"]=cutting.CutOutNo;
                                        dataItem["date"]=cutting.CuttingOutDate;
                                        dataItem["qty"]=detail.CuttingOutQuantity;
                                        dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.CuttingOutQuantity :detail.CuttingOutQuantity;
                                        this.cuttingData.push(dataItem);
                                    }
                                    else{
                                        var idx= this.cuttingData.indexOf(same);
                                        same["qty"]+=detail.CuttingOutQuantity;
                                        same[detail.Size.Size]= same[detail.Size.Size] ? same[detail.Size.Size]+detail.CuttingOutQuantity :detail.CuttingOutQuantity;
                                        this.cuttingData[idx]=same;
                                    }
                                    
                                }
                                if(this.cuttingSizes.length==0){
                                    this.cuttingSizes.push(detail.Size.Size);
                                }
                                else{
                                    var dup= this.cuttingSizes.find(a=>a==detail.Size.Size);
                                    if(!dup){
                                        this.cuttingSizes.push(detail.Size.Size);
                                    }
                                }
                                this.totalCutQuantity+=detail.CuttingOutQuantity;

                            }
                        }
                    }
                    
                    this.service.searchLoading({ filter: JSON.stringify({ RONo: this.RONo}) })
                    .then(result => {
                        this.loadingData=[];
                        this.loadingSizes=[];
                        this.totalLoadingQuantity=0;
                        for(var loading of result.data){
                            for(var detail of loading.Items){
                                let dataItem=[];
                                if (this.loadingData.length==0){
                                    dataItem["color"]=detail.Color;
                                    dataItem["loadingNo"]=loading.LoadingNo;
                                    dataItem["date"]=loading.LoadingDate;
                                    dataItem["qty"]=detail.Quantity;
                                    dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                    this.loadingData.push(dataItem);
                                }
                                else{
                                    var same= this.loadingData.find(s=>s.color==detail.Color && s.loadingNo==loading.LoadingNo);
                                    if(!same){
                                        dataItem["color"]=detail.Color;
                                        dataItem["loadingNo"]=loading.LoadingNo;
                                        dataItem["date"]=loading.LoadingDate;
                                        dataItem["qty"]=detail.Quantity;
                                        dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                        this.loadingData.push(dataItem);
                                    }
                                    else{
                                        var idx= this.loadingData.indexOf(same);
                                        same["qty"]+=detail.Quantity;
                                        same[detail.Size.Size]= same[detail.Size.Size] ? same[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                        this.loadingData[idx]=same;
                                    }
                                }
                                if(this.loadingSizes.length==0){
                                    this.loadingSizes.push(detail.Size.Size);
                                }
                                else{
                                    var dup= this.loadingSizes.find(a=>a==detail.Size.Size);
                                    if(!dup){
                                        this.loadingSizes.push(detail.Size.Size);
                                    }
                                }
                                this.totalLoadingQuantity+=detail.Quantity;

                            
                            }
                        }

                        this.service.searchSewing({ filter: JSON.stringify({ RONo: this.RONo, SewingTo:"FINISHING"}) })
                        .then(result => {
                            this.sewingData=[];
                            this.sewingSizes=[];
                            this.totalSewingQuantity=0;
                            for(var sewing of result.data){
                                for(var item of sewing.Items){
                                    if(sewing.IsDifferentSize){
                                        for(var detail of item.Details){
                                            if(this.sewingSizes.length==0){
                                                this.sewingSizes.push(detail.Size.Size);
                                            }
                                            else{
                                                var dup= this.sewingSizes.find(a=>a==detail.Size.Size);
                                                if(!dup){
                                                    this.sewingSizes.push(detail.Size.Size);
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        if(this.sewingSizes.length==0){
                                            this.sewingSizes.push(item.Size.Size);
                                        }
                                        else{
                                            var dup= this.sewingSizes.find(a=>a==item.Size.Size);
                                            if(!dup){
                                                this.sewingSizes.push(item.Size.Size);
                                            }
                                        }
                                    }
                                    let dataItem=[];
                                    if (this.sewingData.length==0){
                                        dataItem["color"]=item.Color;
                                        dataItem["sewingNo"]=sewing.SewingOutNo;
                                        dataItem["date"]=sewing.SewingOutDate;
                                        dataItem["qty"]=0;
                                        if(sewing.IsDifferentSize){
                                            for(var detail of item.Details){
                                                dataItem["qty"]+=detail.Quantity;
                                                dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                            }
                                        }
                                        else{
                                            dataItem["qty"]+=item.Quantity;
                                            dataItem[item.Size.Size]= dataItem[item.Size.Size] ? dataItem[item.Size.Size]+item.Quantity :item.Quantity;
                                        }
                                        this.sewingData.push(dataItem);
                                    }
                                    else{
                                        var same= this.sewingData.find(s=>s.color==item.Color && s.sewingNo==sewing.SewingOutNo);
                                        if(!same){
                                            dataItem["color"]=item.Color;
                                            dataItem["sewingNo"]=sewing.SewingOutNo;
                                            dataItem["date"]=sewing.SewingOutDate;
                                            dataItem["qty"]=0;
                                            if(sewing.IsDifferentSize){
                                                for(var detail of item.Details){
                                                    dataItem["qty"]+=detail.Quantity;
                                                    dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                                }
                                            }
                                            else{
                                                dataItem["qty"]+=item.Quantity;
                                                dataItem[item.Size.Size]= dataItem[item.Size.Size] ? dataItem[item.Size.Size]+item.Quantity :item.Quantity;
                                            }
                                            this.sewingData.push(dataItem);
                                        }
                                        else{
                                            var idx= this.sewingData.indexOf(same);
                                            if(sewing.IsDifferentSize){
                                                for(var detail of item.Details){
                                                    dataItem["qty"]+=detail.Quantity;
                                                    same[detail.Size.Size]= same[detail.Size.Size] ? same[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                                }
                                            }
                                            else{
                                                same["qty"]+=item.Quantity;
                                                same[item.Size.Size]= same[item.Size.Size] ? same[item.Size.Size]+item.Quantity :item.Quantity;
                                            }
                                            this.sewingData[idx]=same;
                                        }
                                    }
                                    this.totalSewingQuantity+=item.Quantity;
                                }
                            }

                            this.service.searchFinishing({ filter: JSON.stringify({ RONo: this.RONo, FinishingTo:"GUDANG JADI"}) })
                            .then(result => {
                                this.finishingData=[];
                                this.finishingSizes=[];
                                this.totalFinishingQuantity=0;
                                for(var finishing of result.data){
                                    for(var item of finishing.Items){
                                        if(finishing.IsDifferentSize){
                                            for(var detail of item.Details){
                                                if(this.finishingSizes.length==0){
                                                    this.finishingSizes.push(detail.Size.Size);
                                                }
                                                else{
                                                    var dup= this.finishingSizes.find(a=>a==detail.Size.Size);
                                                    if(!dup){
                                                        this.finishingSizes.push(detail.Size.Size);
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            if(this.finishingSizes.length==0){
                                                this.finishingSizes.push(item.Size.Size);
                                            }
                                            else{
                                                var dup= this.finishingSizes.find(a=>a==item.Size.Size);
                                                if(!dup){
                                                    this.finishingSizes.push(item.Size.Size);
                                                }
                                            }
                                        }
                                        let dataItem=[];
                                        if (this.finishingData.length==0){
                                            dataItem["color"]=item.Color;
                                            dataItem["finishingNo"]=finishing.FinishingOutNo;
                                            dataItem["date"]=finishing.FinishingOutDate;
                                            dataItem["qty"]=0;
                                            if(finishing.IsDifferentSize){
                                                for(var detail of item.Details){
                                                    dataItem["qty"]+=detail.Quantity;
                                                    dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                                }
                                            }
                                            else{
                                                dataItem["qty"]+=item.Quantity;
                                                dataItem[item.Size.Size]= dataItem[item.Size.Size] ? dataItem[item.Size.Size]+item.Quantity :item.Quantity;
                                            }
                                            
                                            this.finishingData.push(dataItem);
                                        }
                                        else{
                                            var same= this.finishingData.find(s=>s.color==item.Color && s.finishingNo==finishing.FinishingOutNo);
                                            if(!same){
                                                dataItem["color"]=item.Color;
                                                dataItem["finishingNo"]=finishing.FinishingOutNo;
                                                dataItem["date"]=finishing.FinishingOutDate;
                                                dataItem["qty"]=0;
                                                if(finishing.IsDifferentSize){
                                                    for(var detail of item.Details){
                                                        dataItem["qty"]+=detail.Quantity;
                                                        dataItem[detail.Size.Size]= dataItem[detail.Size.Size] ? dataItem[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                                    }
                                                }
                                                else{
                                                    dataItem["qty"]+=item.Quantity;
                                                    dataItem[item.Size.Size]= dataItem[item.Size.Size] ? dataItem[item.Size.Size]+item.Quantity :item.Quantity;
                                                }
                                                this.finishingData.push(dataItem);
                                            }
                                            else{
                                                var idx= this.finishingData.indexOf(same);
                                                if(finishing.IsDifferentSize){
                                                    for(var detail of item.Details){
                                                        same["qty"]+=detail.Quantity;
                                                        same[detail.Size.Size]= same[detail.Size.Size] ? same[detail.Size.Size]+detail.Quantity :detail.Quantity;
                                                    }
                                                }
                                                else{
                                                    same["qty"]+=item.Quantity;
                                                    same[item.Size.Size]= same[item.Size.Size] ? same[item.Size.Size]+item.Quantity :item.Quantity;
                                                }
                                                this.finishingData[idx]=same;
                                            }
                                        }
                                        this.totalFinishingQuantity+=item.Quantity;
                                    }
                                }

                                this.service.searchExpenditure({ filter: JSON.stringify({ RONo: this.RONo}) })
                                .then(result => {
                                    this.expenditureData=[];
                                    this.expenditureSizes=[];
                                    this.totalExpenditureQuantity=0;
                                    for(var expenditure of result.data){
                                        for(var item of expenditure.Items){
                                            let dataItem=[];
                                            if (this.expenditureData.length==0){
                                                dataItem["color"]=item.Description;
                                                dataItem["expenditureNo"]=expenditure.ExpenditureGoodNo;
                                                dataItem["date"]=expenditure.ExpenditureDate;
                                                dataItem["qty"]=item.Quantity;
                                                dataItem[item.Size.Size]= dataItem[item.Size.Size] ? dataItem[item.Size.Size]+item.Quantity :item.Quantity;
                                                this.expenditureData.push(dataItem);
                                            }
                                            else{
                                                var same= this.expenditureData.find(s=>s.color==item.Description && s.expenditureNo==expenditure.ExpenditureGoodNo);
                                                if(!same){
                                                    dataItem["color"]=item.Description;
                                                    dataItem["expenditureNo"]=expenditure.ExpenditureGoodNo;
                                                    dataItem["date"]=expenditure.ExpenditureDate;
                                                    dataItem["qty"]=item.Quantity;
                                                    dataItem[item.Size.Size]= dataItem[item.Size.Size] ? dataItem[item.Size.Size]+item.Quantity :item.Quantity;
                                                    this.expenditureData.push(dataItem);
                                                }
                                                else{
                                                    var idx= this.expenditureData.indexOf(same);
                                                    same["qty"]+=item.Quantity;
                                                    same[item.Size.Size]= same[item.Size.Size] ? same[item.Size.Size]+item.Quantity :item.Quantity;
                                                    this.expenditureData[idx]=same;
                                                }
                                            }
                                            if(this.expenditureSizes.length==0){
                                                this.expenditureSizes.push(item.Size.Size);
                                            }
                                            else{
                                                var dup= this.expenditureSizes.find(a=>a==item.Size.Size);
                                                if(!dup){
                                                    this.expenditureSizes.push(item.Size.Size);
                                                }
                                            }
                                            this.totalExpenditureQuantity+=item.Quantity;
                                        }
                                    }
                                    this.getcomodity(this.RONo);
                                    this.fillTable();
                                });
                            });
                        });
                    });
                });
            });
        }
        
      }
    
      fillTable() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'UENNo', title: 'BUK' });
        columns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });

        for(let plan of this.products) {
            columns.push({ field: `${plan}`, title: plan,
                formatter: (cell) => {return cell } });
        }
        columns.push({ field: 'qty', title: 'Total' });
        var bootstrapTableOptions = {
          columns: columns,
          data: this.data,
          fixedColumns: true,
          fixedNumber: 1
        };
        bootstrapTableOptions.height = 150;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        //CUTTING
        let cutColumns=[];
        cutColumns.push({ field: 'CuttingNo', title: 'No Bon' });
        cutColumns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });
        cutColumns.push({ field: 'color', title: 'Warna' });
        this.cuttingSizes.sort();
        for(let size of this.cuttingSizes) {
            cutColumns.push({ field: `${size}`, title: size,
                formatter: (cell) => {return cell } });
        }
        cutColumns.push({ field: 'qty', title: 'Total' });
        var bootstrapCuttingTableOptions = {
            columns: cutColumns,
            data: this.cuttingData,
            fixedColumns: true,
            fixedNumber: 1
        };
        bootstrapCuttingTableOptions.height = 150;
        $(this.cuttingTable).bootstrapTable('destroy').bootstrapTable(bootstrapCuttingTableOptions);

        //LOADING
        let loadingColumns=[];
        loadingColumns.push({ field: 'loadingNo', title: 'No Bon' });
        loadingColumns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });
        loadingColumns.push({ field: 'color', title: 'Warna' });
        this.loadingSizes.sort();
        for(let size of this.loadingSizes) {
            loadingColumns.push({ field: `${size}`, title: size,
                formatter: (cell) => {return cell } });
        }
        loadingColumns.push({ field: 'qty', title: 'Total' });
        
        var bootstrapLoadingTableOptions = {
            columns: loadingColumns,
            data: this.loadingData,
            fixedColumns: true,
            fixedNumber: 1
        };
        bootstrapLoadingTableOptions.height = 150;
        $(this.loadingTable).bootstrapTable('destroy').bootstrapTable(bootstrapLoadingTableOptions);
        
        //SEWING
        let sewingColumns=[];
        sewingColumns.push({ field: 'sewingNo', title: 'No Bon' });
        sewingColumns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });
        sewingColumns.push({ field: 'color', title: 'Warna' });
        this.sewingSizes.sort();
        for(let size of this.sewingSizes) {
            sewingColumns.push({ field: `${size}`, title: size,
                formatter: (cell) => {return cell } });
        }
        sewingColumns.push({ field: 'qty', title: 'Total' });
        
        var bootstrapSewingTableOptions = {
            columns: sewingColumns,
            data: this.sewingData,
            fixedColumns: true,
            fixedNumber: 1
        };
        bootstrapSewingTableOptions.height = 150;
        $(this.sewingTable).bootstrapTable('destroy').bootstrapTable(bootstrapSewingTableOptions);
    
        //FINISHING
        let finishingColumns=[];
        finishingColumns.push({ field: 'finishingNo', title: 'No Bon' });
        finishingColumns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });
        finishingColumns.push({ field: 'color', title: 'Warna' });
        this.finishingSizes.sort();
        for(let size of this.finishingSizes) {
            finishingColumns.push({ field: `${size}`, title: size,
                formatter: (cell) => {return cell } });
        }
        finishingColumns.push({ field: 'qty', title: 'Total' });
        
        var bootstrapFinishingTableOptions = {
            columns: finishingColumns,
            data: this.finishingData,
            fixedColumns: true,
            fixedNumber: 1
        };
        bootstrapFinishingTableOptions.height = 150;
        $(this.finishingTable).bootstrapTable('destroy').bootstrapTable(bootstrapFinishingTableOptions);
    
        //EXGOOD
        let expenditureColumns=[];
        expenditureColumns.push({ field: 'expenditureNo', title: 'No Bon' });
        expenditureColumns.push({ field: 'date', title: 'Tanggal', formatter: value => moment(value).format("DD MMM YYYY") });
        expenditureColumns.push({ field: 'color', title: 'Warna' });
        this.expenditureSizes.sort();
        for(let size of this.expenditureSizes) {
            expenditureColumns.push({ field: `${size}`, title: size,
                formatter: (cell) => {return cell } });
        }
        expenditureColumns.push({ field: 'qty', title: 'Total' });
        
        var bootstrapExpenditureTableOptions = {
            columns: expenditureColumns,
            data: this.expenditureData,
            fixedColumns: true,
            fixedNumber: 1
        };
        bootstrapExpenditureTableOptions.height = 150;
        $(this.expenditureTable).bootstrapTable('destroy').bootstrapTable(bootstrapExpenditureTableOptions);
    
    }

    reset() {
        this.expenditureData = null;
        this.data = null;
        this.loadingData = null;
        this.cuttingData = null;
        this.finishingData = null;
        this.sewingData = null;
        this.article=null;
        this.buyer=null;
        this.RONo=null;
        this.comodity=null;
        this.quantity=null;
        this.roNo=null;
    }

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };
}