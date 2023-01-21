import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "inspection-balance-im";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    getExcel(dateReport,shift,unit){
        let endpoint = `${serviceUri}/xls`;
        let query = ''
        
        if (dateReport) {
            if (query === '') query = `dateReport=${(dateReport)}`;
            else query = `${query}&dateReport=${(dateReport)}`;
        }
        if (shift) {
            if (query === '') query = `shift=${(shift)}`;
            else query = `${query}&shift=${(shift)}`;
        }
        if (unit) {
            if (query === '') query = `unit=${unit}`;
            else query = `${query}&unit=${unit}`;
        }
        if (query !== '')
            endpoint += `?${query}`;
            
        return super.getXls(endpoint);
    }
    
    getReport(dateReport,shift,unit){
        let endpoint = `${serviceUri}`;
        let query = ''
        
        if (dateReport) {
            if (query === '') query = `dateReport=${(dateReport)}`;
            else query = `${query}&dateReport=${(dateReport)}`;
        }
        if (shift) {
            if (query === '') query = `shift=${(shift)}`;
            else query = `${query}&shift=${(shift)}`;
        }
        if (unit) {
            if (query === '') query = `unit=${unit}`;
            else query = `${query}&unit=${unit}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
            
        return super.get(endpoint);
    }
}
