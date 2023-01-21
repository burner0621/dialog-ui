import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
var moment = require('moment');

const serviceUri = 'garment-internal-purchase-orders';
const servicePRUri = 'garment-purchase-requests';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}/by-user`;
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

    split(data) {
        var endpoint = `${serviceUri}/split/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    searchByTags(keyword, shipmentDateFrom, shipmentDateTo) {
        var endpoint = `${servicePRUri}/by-tags`;
        var filter = {};
        if (keyword && shipmentDateFrom && shipmentDateTo) {
            filter = {
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
                tags: keyword
            };
            return super.list(endpoint, filter);
        }
        else if (keyword) {
            filter = { tags: keyword };
            return super.list(endpoint, filter);
        } else if (shipmentDateFrom && shipmentDateTo) {
            filter = {
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
            };
            return super.list(endpoint, filter);
        } else {
            return super.list(endpoint);
        }
    }
}