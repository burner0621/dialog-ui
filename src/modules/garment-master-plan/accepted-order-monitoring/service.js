import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'garment-master-plan/sewing-blocking-plans-accepted-order-monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) { 
        var endpoint = `${serviceUri}?filter=${info}`;
        return super.get(endpoint);
        
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}?filter=${info}`;
        return super.getXls(endpoint);
    }

    getWeeklyPlan(filter){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("sales");
        var _serviceUri = `garment-master-plan/weekly-plans`;

        return _endpoint.find(_serviceUri, { filter: JSON.stringify(filter) })
            .then(result => {
                return result.data;
            });
    }
}

