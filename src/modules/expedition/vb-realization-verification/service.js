import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'vb-realization-expeditions';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    acceptForVerification(data) {
        let endpoint = `${serviceUri}/accept-for-verification`;
        return super.put(endpoint, data);
    }

    verified(realizationId) {
        let endpoint = `${serviceUri}/vb-verified/${realizationId}`;
        return super.put(endpoint);
    }

    reject(id, data) {
        
        let endpoint = `${serviceUri}/vb-reject/${id}`;
        return super.put(endpoint, data);
    }

    acceptForCashier(data) {
        let endpoint = `${serviceUri}/accept-for-cashier`;
        return super.put(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    search(info) {
        let endpoint = `${serviceUri}/verification`;
        return super.list(endpoint, info);
    }
}

// export class 
