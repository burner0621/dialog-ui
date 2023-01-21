import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
const serviceUri = 'sales/finishing-printing-sales-contracts';


export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
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

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getDefaultVat(info){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/vat`;
        return _endpoint.find(_serviceUri, info)
        .then(result => {
            return result.data;
        })
    }

    // getSPPbySC(no, select) {
    //     var config = Container.instance.get(Config);
    //     var _endpoint = config.getEndpoint("production");
    //     var _serviceUri = `/sales/production-order-by-sales-contract-numbers/${no}`;

    //     return _endpoint.find(_serviceUri)
    //         .then(result => {
    //             return result.data;
    //         });
    // }
}