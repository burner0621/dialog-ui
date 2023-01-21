import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'sales/garment-booking-orders-report';
const serviceUriDownload = 'sales/garment-booking-orders-report/download';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) { 
        var endpoint = `${serviceUri}`;
        // var query = '';
        
        // if (info.no && info.no !== "") {
        //     if (query === '') query = `no=${info.no}`;
        //     else query = `${query}&no=${info.no}`;
        // }
        // if (info.buyerCode && info.buyerCode !== "") {
        //     if (query === '') query = `buyerCode=${info.buyerCode}`;
        //     else query = `${query}&buyerCode=${info.buyerCode}`;
        // }
        // if (info.statusCancel && info.statusCancel !== "") {
        //     if (query === '') query = `statusCancel=${info.statusCancel}`;
        //     else query = `${query}&statusCancel=${info.statusCancel}`;
        // }
        // if (info.dateFrom && info.dateFrom !== "") {
        //     if (query === '') query = `dateFrom=${info.dateFrom}`;
        //     else query = `${query}&dateFrom=${info.dateFrom}`;
        // }
        // if (info.dateTo && info.dateTo !== "") {
        //     if (query === '') query = `dateTo=${info.dateTo}`;
        //     else query = `${query}&dateTo=${info.dateTo}`;
        // }
        // if (query !== '')
        //     endpoint = `${serviceUri}?${query}`;
        return super.list(endpoint,info);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUriDownload}`;
        var query = '';
        if (info.no && info.no !== "") {
            if (query === '') query = `no=${info.no}`;
            else query = `${query}&no=${info.no}`;
        }
        if (info.buyerCode && info.buyerCode !== "") {
            if (query === '') query = `buyerCode=${info.buyerCode}`;
            else query = `${query}&buyerCode=${info.buyerCode}`;
        }
        if (info.statusCancel && info.statusCancel !== "") {
            if (query === '') query = `statusCancel=${info.statusCancel}`;
            else query = `${query}&statusCancel=${info.statusCancel}`;
        }
        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (query !== '')
            endpoint = `${serviceUriDownload}?${query}`;
        return super.getXls(endpoint);
    }
}