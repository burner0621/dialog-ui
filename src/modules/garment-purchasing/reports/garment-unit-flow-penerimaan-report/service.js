import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

//const uriPurchasingDocumentExpeditionReport = 'expedition/purchasing-document-expeditions-report';
const serviceUri = 'garment-unit-receipt-notes/laporan';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        // console.log(info);
        // let endpoint = `${uriGRC}`;
        // return super.list(endpoint, info);
        // console.log(info);
        var endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&unit=${info.unit}&category=${info.category}`;
        // return super.list(endpoint, info);
        return super.get(endpoint);
    }

    xls(unit,  category, dateFrom, dateTo, unitname, categoryname) { 
        console.log(unit,  category, dateFrom, dateTo);
        var endpoint = `${serviceUri}/download-for-unit?dateFrom=${dateFrom}&dateTo=${dateTo}&unit=${unit}&category=${category}&categoryname=${categoryname}&unitname=${unitname}`;
        return super.getXls(endpoint);
    }
}

