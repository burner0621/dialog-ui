import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'sales/garment-booking-orders-monitoring';
const serviceUriDownload = 'sales/garment-booking-orders-monitoring/download';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) { 
        var endpoint = `${serviceUri}`;
        return super.list(endpoint,info);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUriDownload}`;
        var query = '';
        if (info.section && info.section !== "") {
            if (query === '') query = `section=${info.section}`;
            else query = `${query}&section=${info.section}`;
        }
        if (info.no && info.no !== "") {
            if (query === '') query = `no=${info.no}`;
            else query = `${query}&no=${info.no}`;
        }
        if (info.buyerCode && info.buyerCode !== "") {
            if (query === '') query = `buyerCode=${info.buyerCode}`;
            else query = `${query}&buyerCode=${info.buyerCode}`;
        }
        if (info.comodityCode && info.comodityCode !== "") {
            if (query === '') query = `comodityCode=${info.comodityCode}`;
            else query = `${query}&comodityCode=${info.comodityCode}`;
        }
        if (info.statusConfirm && info.statusConfirm !== "") {
            if (query === '') query = `statusConfirm=${info.statusConfirm}`;
            else query = `${query}&statusConfirm=${info.statusConfirm}`;
        }
        if (info.statusBookingOrder && info.statusBookingOrder !== "") {
            if (query === '') query = `statusBookingOrder=${info.statusBookingOrder}`;
            else query = `${query}&statusBookingOrder=${info.statusBookingOrder}`;
        }
        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.dateDeliveryFrom && info.dateDeliveryFrom !== "") {
            if (query === '') query = `dateDeliveryFrom=${info.dateDeliveryFrom}`;
            else query = `${query}&dateDeliveryFrom=${info.dateDeliveryFrom}`;
        }
        if (info.dateDeliveryTo && info.dateDeliveryTo !== "") {
            if (query === '') query = `dateDeliveryTo=${info.dateDeliveryTo}`;
            else query = `${query}&dateDeliveryTo=${info.dateDeliveryTo}`;
        }
        if (query !== '')
            endpoint = `${serviceUriDownload}?${query}`;
        return super.getXls(endpoint);
    }
}