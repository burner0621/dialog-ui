import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "goods-warehouse-document";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    getExcel(dateReport,group,zona){
        let endpoint = `${serviceUri}/xls`;
        let query = ''
        
        if (dateReport) {
            if (query === '') query = `dateReport=${(dateReport)}`;
            else query = `${query}&dateReport=${(dateReport)}`;
        }
        if (group) {
            if (query === '') query = `group=${(group)}`;
            else query = `${query}&group=${(group)}`;
        }
        if (zona) {
            if (query === '') query = `zona=${zona}`;
            else query = `${query}&zona=${zona}`;
        }
        if (query !== '')
            endpoint += `?${query}`;
            
        return super.getXls(endpoint);
    }
    
    getReport(dateReport,group,zona){
        let endpoint = `${serviceUri}`;
        let query = ''
        
        if (dateReport) {
            if (query === '') query = `dateReport=${(dateReport)}`;
            else query = `${query}&dateReport=${(dateReport)}`;
        }
        if (group) {
            if (query === '') query = `group=${(group)}`;
            else query = `${query}&group=${(group)}`;
        }
        if (zona) {
            if (query === '') query = `zona=${zona}`;
            else query = `${query}&zona=${zona}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
            
        return super.get(endpoint);
    }
}
