import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUriBUM = 'garment-unit-receipt-notes';
const serviceUriBUK = 'garment-unit-expenditure-notes';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    searchBUM(info) {
        var endpoint = `${serviceUriBUM}`;
        return super.list(endpoint, info);
    }

    searchBUK(info) {
        var endpoint = `${serviceUriBUK}`;
        return super.list(endpoint, info);
    }    

    updateDate(data,type) {
        var uri="";
        if (type=="BUM"){
            uri= `${serviceUriBUM}/revisedate-urn`;
        }
        else if(type=="BUK"){
            uri=`${serviceUriBUK}/revisedate-uen`;
        }

        var endpoint = `${uri}/${data.reviseDate}`;
        return super.put(endpoint, data.Ids);
    }

    addhistories(data,type) {
        var uri="";
        if (type=="BUM"){
            uri= `${serviceUriBUM}/history-change-date`;
        }
        else if(type=="BUK"){
            uri=`${serviceUriBUK}/history-change-date`;
        }

        var endpoint = `${uri}/${data.reviseDate}`;
        return super.post(endpoint, data.Ids);
    }

    
}