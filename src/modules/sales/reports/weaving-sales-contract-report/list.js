import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var BuyersLoader = require('../../../../loader/buyers-loader');
var ComodityLoader = require('../../../../loader/comodity-loader');
var WeavingSalesContractLoader = require('../../../../loader/weaving-sales-contract-loader');

@inject(Router, Service)
export class List {


    info = {
        salesContractNo: "",
        buyerId: "",
        comodityId: "",
        dateFrom: "",
        dateTo: "",

    };
    info = { page: 1,size:25};
    salesContractNo = {};
    buyer = {};
    comodity = {};
    dateFrom = '';
    dateTo = '';

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }
    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    search(){
        //  this.error = {};

        // if (Object.getOwnPropertyNames(this.error).length === 0) {
            //this.flag = true;
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        
    }
    searching() {
        if (this.filter) {
            this.info.no = this.filter.salesContractNo ? this.filter.salesContractNo.SalesContractNo : null;
            this.info.buyerCode = this.filter.buyer ? this.filter.buyer.Code : null;
            this.info.comodityCode = this.filter.comodity ? this.filter.comodity.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } 
        this.service.search(this.info)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
            })
    }


    

    ExportToExcel() {
        if (this.filter) {
            this.info.no = this.filter.salesContractNo ? this.filter.salesContractNo.SalesContractNo : null;
            this.info.buyerCode = this.filter.buyer ? this.filter.buyer.Code : null;
            this.info.comodityCode = this.filter.comodity ? this.filter.comodity.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        // else {
        //     this.info = {};
        // }
        this.service.generateExcel(this.info);
    }

    buyersChanged(e) {
        // console.log('buyer changed')
    }

    comodityChanged(e) {
        // console.log('comodity changed')
    }

    weavingSalesContractLoaderChanged(e) {
        // console.log('weavingSalesContractLoader changed')
    }

    get buyersLoader() {
        return BuyersLoader;
    }
    buyerView = (buyer) =>{
        return `${buyer.Code} - ${buyer.Name}`
    }

    get comodityLoader() {
        return ComodityLoader;
    }
    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get weavingSalesContractLoaderLoader() {
        return WeavingSalesContractLoader;
    }

    reset() {
        this.filter.salesContractNo=null;
        this.filter.buyer=null;
        this.filter.comodity=null;
        this.filter.dateFrom=null;
        this.filter.dateTo=null;
        this.filter = {};
    }



}