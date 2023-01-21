import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'internal-transfer-orders';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "int-purchasing");
    }
    
    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    approveData(ids) {
        let endpoint = `${serviceUri}`;
        return super.put(endpoint, ids);
    }
    create(data) {
        var endpoint = `${serviceUri}`;
      
        return super.post(endpoint, data);
    }   

    split(data) {
        var endpoint = 'internal-transfer-orders/split';
        // console.log(data);
        return super.post(endpoint, data);
     
    }
     update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }
    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }
}