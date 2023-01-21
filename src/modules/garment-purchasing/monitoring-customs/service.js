import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'customs/reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(info) { 
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.no && info.no !== "") {
            if (query === '') query = `no=${info.no}`;
            else query = `${query}&no=${info.no}`;
        }
        if (info.supplier && info.supplier !== "") {
            if (query === '') query = `supplier=${info.supplier}`;
            else query = `${query}&supplier=${info.supplier}`;
        }
        if (info.customsType && info.customsType !== "") {
            if (query === '') query = `customsType=${info.customsType}`;
            else query = `${query}&customsType=${info.customsType}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.no && info.no !== "") {
            if (query === '') query = `no=${info.no}`;
            else query = `${query}&no=${info.no}`;
        }
        if (info.supplier) {
            if (query === '') query = `supplier=${info.supplier}`;
            else query = `${query}&supplier=${info.supplier}`;
        }
        if (info.customsType && info.customsType !== "") {
            if (query === '') query = `customsType=${info.customsType}`;
            else query = `${query}&customsType=${info.customsType}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
        return super.getXls(endpoint);
    }
}