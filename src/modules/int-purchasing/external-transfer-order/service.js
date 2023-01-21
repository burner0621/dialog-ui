import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'external-transfer-orders';
const internalTransferOrderServiceUri = 'internal-transfer-orders';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "int-purchasing");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
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

    pdf(data) {
        var endpoint = `${serviceUri}/pdf/${data.Id}`;
        return super.getPdf(endpoint);
    }

    getCurrency(keyword, filter) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var resource = 'master/currencies';
        var promise = endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) });
        super.publish(promise);
        return promise
            .then(results => {
                super.publish(promise);
                return results.data[0];
            });
    }

    getInternalTransferOrderById(id) {
        var endpoint = `${internalTransferOrderServiceUri}/${id}`;
        return super.get(endpoint);
    }

    post(data) {
        var endpoint = `${serviceUri}/eto-post`;
        return super.put(endpoint, data);
    }

    unpost(id) {
        var endpoint = `${serviceUri}/eto-unpost/${id}`;
        return super.put(endpoint);
    }
    
    cancel(id) {
        var endpoint = `${serviceUri}/cancel/${id}`;
        return super.put(endpoint);
    }
    
    close(id) {
        var endpoint = `${serviceUri}/close/${id}`;
        return super.put(endpoint);
    }

    isUsedByDeliveryOrder(id) {
        var endpoint = `${serviceUri}/isused/${id}`;
        return super.get(endpoint);
    }
}