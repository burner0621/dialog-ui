import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = 'garment-sample-requests';
const UnitServiceUri = 'master/units';
const unitDeliveryOrderUri = 'garment-unit-delivery-orders'
const unitExpenditureNoteUri = 'garment-unit-expenditure-notes'
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}/monitoring`;
        var query = '';

        if (info.receivedDateFrom && info.receivedDateFrom !== "") {
            if (query === '') query = `receivedDateFrom=${info.receivedDateFrom}`;
            else query = `${query}&receivedDateFrom=${info.receivedDateFrom}`;
        }
        if (info.receivedDateTo && info.receivedDateTo !== "") {
            if (query === '') query = `receivedDateTo=${info.receivedDateTo}`;
            else query = `${query}&receivedDateTo=${info.receivedDateTo}`;
        }
        
        if (query !== '')
        endpoint = `${serviceUri}/monitoring?${query}`;

    return super.get(endpoint);

      
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        console.log(endpoint);
        var query = '';
        
        if (info.receivedDateFrom && info.receivedDateFrom !== "") {
            if (query === '') query = `receivedDateFrom=${info.receivedDateFrom}`;
            else query = `${query}&receivedDateFrom=${info.receivedDateFrom}`;
        }
        if (info.receivedDateTo && info.receivedDateTo !== "") {
            if (query === '') query = `receivedDateTo=${info.receivedDateTo}`;
            else query = `${query}&receivedDateTo=${info.receivedDateTo}`;
        }
        
        if (query !== '')
        endpoint = `${serviceUri}/download?${query}`;

    return super.getXls(endpoint);
    }
}

export class PurchasingService extends RestService {

    constructor(http, aggregator, config, api){
        super(http, aggregator, config, "purchasing-azure")
    }

    getUnitDeliveryOrderById(id) {
        var endpoint = `${unitDeliveryOrderUri}/${id}`;
        return super.get(endpoint);
    }

    getUnitExpenditureNoteById(id) {
        var endpoint = `${unitExpenditureNoteUri}/${id}`;
        return super.get(endpoint);
    }
}

export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}