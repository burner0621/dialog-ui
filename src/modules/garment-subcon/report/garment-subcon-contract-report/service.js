import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { RestService } from '../../../utils/rest-service';
const serviceUri = 'subcon-contracts/subcon-contract-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}?supplierNo=${info.supplierNo}&contractType=${info.contractType}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        //let endpoint = `${serviceUri}`;
       
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?supplierNo=${info.supplierNo}&contractType=${info.contractType}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

}
