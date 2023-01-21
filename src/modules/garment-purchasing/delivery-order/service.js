import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'garment-delivery-orders';
const serviceUriByUser = 'garment-delivery-orders/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUriByUser}`;
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
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    // getPurchaseOrderById(id, select) {
    //     var config = Container.instance.get(Config);
    //     var _endpoint = config.getEndpoint("garment-purchasing");
    //     var _serviceUri = `purchase-orders/by-user/${id}`;

    //     return _endpoint.find(_serviceUri, { "select": select })
    //         .then(result => {
    //             return result.data;
    //         });
    // }

    searchGarmentCategory(info) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/garment-categories`;
        var resultTemp = [];
        return _endpoint.find(_serviceUri, info)
            .then(result => {
                for(var data of result.data){
                    var dataTemp = {
                        codeRequirement : data.codeRequirement
                    }
                resultTemp.push(dataTemp);
                }
                return resultTemp;
            });
    }
}
