import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'sales/garment-booking-orders';
const MaxWHServiceUri = 'max-wh-confirms';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchWHConfirm(info) {
        var endpoint = `${MaxWHServiceUri}`;
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

    cancelBooking(data) {
        var endpoint = `${serviceUri}/BOCancel/${data.id}`;
        return super.put(endpoint, data);
    }

    expiredBooking(data) {
        var endpoint = `${serviceUri}/BODelete/${data.id}`;
        return super.put(endpoint, data);
    }

    getMasterPlanByBookingOrderId(info) {
        var config = Container.instance.get(Config);
        var _serviceUri = `sewing-blocking-plans`;
        var _endpoint = config.getEndpoint("sales");
        return _endpoint.find(_serviceUri, info)
            .then(result => {
                return result.data;
            });
    }
}
