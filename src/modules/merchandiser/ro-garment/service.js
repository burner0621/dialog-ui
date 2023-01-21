
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "ro-garments";
const costCalculationGarmentServiceUri = "cost-calculation-garments";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getCostCalculationGarment(info) {
        var endpoint = `${costCalculationGarmentServiceUri}/dynamic`;
        return super.list(endpoint, info);
    }

    getCostCalculationGarmentById(id) {
        var endpoint = `${costCalculationGarmentServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getArticleColors() {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var uri = `articles/colors/all`;
        let promise = endpoint.find(uri);
        this.publish(promise)
        return promise
            .then(result => {
                this.publish(promise);
                return Promise.resolve(result.data.data);
            });
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    postRO(data) {
        var endpoint = `${serviceUri}/post`;
        return super.post(endpoint, data);
    }

    unpostRO(id) {
        var endpoint = `${serviceUri}/unpost/${id}`;
        return super.put(endpoint);
    }

    getFile(path, fileName) {
        return super.getFile(`azure-documents/${path}?fileName=${fileName}`);
    }
}
