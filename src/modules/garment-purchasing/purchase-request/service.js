import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


// const serviceUri = 'purchase-requests/by-user';
const serviceUri = 'garment-purchase-requests';
const costCalculationServiceUri = 'cost-calculation-garments';

class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    } 
} 

class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getCostCalculationByRONo(info) {
        var endpoint = `${costCalculationServiceUri}`;
        return super.list(endpoint, info);
    }

    // getCostCalculationByRONo(roNo) {
    //     var config = Container.instance.get(Config);
    //     var _endpoint = config.getEndpoint("sales");
    //     var _serviceUri = costCalculationServiceUri;

    //     return _endpoint.find(_serviceUri, { RO_Number: roNo })
    //         .then(result => {
    //             console.log(result)
    //             return result.data[0];
    //         });
    // }
}

export { Service, SalesService }