import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'sales/garment-booking-orders';
const serviceUriBookingOrderExpired = 'sales/booking-orders-expired';
const HourServiceUri = 'standard-hours-by-style';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUriBookingOrderExpired}/Expired`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
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

    deleteRemaining(data) {
        var endpoint = `${serviceUriBookingOrderExpired}/BOCancel`;
        return super.post(endpoint, data);
    }
}