import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';


const serviceUri = 'etl-garment-purchase-requests';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }


    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    migrate(data) {
        var endpoint = `${serviceUri}/migrate/file`;
        return super.post(endpoint, data);
    }

    getDataSql(data) {
        var endpoint = `${serviceUri}/get/data`;
        return super.post(endpoint, data);
    }

}